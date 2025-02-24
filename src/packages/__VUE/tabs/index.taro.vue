<template>
  <view ref="container" class="nut-tabs" :class="[direction]">
    <nut-scroll-view
      :id="`nut-tabs__titles_${refRandomId}`"
      :scroll-x="getScrollX"
      :scroll-y="getScrollY"
      :scroll-with-animation="scrollWithAnimation"
      :scroll-left="scrollLeft"
      :scroll-top="scrollTop"
      :enable-flex="true"
      class="nut-tabs__titles"
      :class="{ [type]: type, scrollable: titleScroll, [size]: size }"
      :style="tabsNavStyle"
    >
      <view class="nut-tabs__list" :class="{ 'nut-tabs__titles-left': align === 'left' }">
        <slot v-if="$slots.titles" name="titles"></slot>
        <template v-else>
          <view
            v-for="(item, index) in titles"
            :key="item.paneKey"
            class="nut-tabs__titles-item taro"
            :style="titleStyle"
            :class="{
              'nut-tabs__titles-item-left': align === 'left',
              active: item.paneKey == modelValue,
              disabled: item.disabled
            }"
            @click="tabChange(item, index)"
          >
            <view v-if="type == 'line'" class="nut-tabs__titles-item__line" :style="tabsActiveStyle"></view>
            <view v-if="type == 'smile'" class="nut-tabs__titles-item__smile" :style="tabsActiveStyle">
              <JoySmile :color="color" />
            </view>
            <view class="nut-tabs__titles-item__text" :class="{ ellipsis: ellipsis }">{{ item.title }} </view>
          </view>
          <view v-if="canShowLabel && titleScroll" class="nut-tabs__titles-placeholder"></view>
        </template>
      </view>
    </nut-scroll-view>
    <view
      :id="'tabsContentRef-' + refRandomId"
      ref="tabsContentRef"
      class="nut-tabs__content"
      :style="contentStyle"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    >
      <slot name="default"></slot>
    </view>
  </view>
</template>
<script lang="ts">
import Taro from '@tarojs/taro';
import {
  onMounted,
  provide,
  VNode,
  ref,
  Ref,
  computed,
  onActivated,
  watch,
  nextTick,
  CSSProperties,
  PropType
} from 'vue';
import NutScrollView from '../scroll-view/index.taro.vue';
import { JoySmile } from '@nutui/icons-vue-taro';
import { createComponent } from '@/packages/utils/create';
import { pxCheck } from '@/packages/utils/pxCheck';
import { TypeOfFun } from '@/packages/utils/util';
import raf from '@/packages/utils/raf';
import { useTabContentTouch } from './hooks';
import { useTaroRect } from '@/packages/utils/useTaroRect';
import type { RectItem, TabsDirection, TabsSize, TabsType, TabsAlign } from './types';

export class Title {
  title = '';
  titleSlot?: VNode[];
  paneKey = '';
  disabled = false;
  constructor() {}
}

const { create } = createComponent('tabs');

export default create({
  components: {
    JoySmile,
    NutScrollView
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: 0
    },
    color: {
      type: String,
      default: ''
    },
    direction: {
      type: String as PropType<TabsDirection>,
      default: 'horizontal'
    },
    size: {
      type: String as PropType<TabsSize>,
      default: 'normal'
    },
    type: {
      type: String as PropType<TabsType>,
      default: 'line'
    },
    titleScroll: {
      type: Boolean,
      default: false
    },
    ellipsis: {
      type: Boolean,
      default: true
    },
    swipeable: {
      type: Boolean,
      default: false
    },
    autoHeight: {
      type: Boolean,
      default: false
    },
    background: {
      type: String,
      default: ''
    },
    animatedTime: {
      type: [Number, String],
      default: 300
    },
    titleGutter: {
      type: [Number, String],
      default: 0
    },
    sticky: {
      type: Boolean,
      default: false
    },
    top: {
      type: Number,
      default: 0
    },
    align: {
      type: String as PropType<TabsAlign>,
      default: 'center'
    }
  },
  emits: ['update:modelValue', 'click', 'change'],

  setup(props, { emit, slots }: any) {
    const refRandomId = Math.random().toString(36).slice(-8);
    const container = ref(null);
    provide('tabsOpiton', {
      activeKey: computed(() => props.modelValue || '0'),
      autoHeight: computed(() => props.autoHeight),
      animatedTime: computed(() => props.animatedTime)
    });
    const titles: Ref<Title[]> = ref([]);
    const renderTitles = (vnodes: VNode[]) => {
      vnodes.forEach((vnode: VNode, index: number) => {
        let type = vnode.type;
        type = (type as any).name || type;
        if (type == 'NutTabPane') {
          let title = new Title();
          if (vnode.props?.title || vnode.props?.['pane-key'] || vnode.props?.['paneKey']) {
            let paneKeyType = TypeOfFun(vnode.props?.['pane-key']);
            let paneIndex =
              paneKeyType == 'number' || paneKeyType == 'string' ? String(vnode.props?.['pane-key']) : null;
            let camelPaneKeyType = TypeOfFun(vnode.props?.['paneKey']);
            let camelPaneIndex =
              camelPaneKeyType == 'number' || camelPaneKeyType == 'string' ? String(vnode.props?.['paneKey']) : null;
            title.title = vnode.props?.title;
            title.paneKey = paneIndex || camelPaneIndex || String(index);
            title.disabled = vnode.props?.disabled;
          } else {
            // title.titleSlot = vnode.children?.title() as VNode[];
          }
          titles.value.push(title);
        } else {
          if (vnode.children == ' ') {
            return;
          }
          renderTitles(vnode.children as VNode[]);
        }
      });
    };

    const currentIndex = ref((props.modelValue as number) || 0);
    const findTabsIndex = (value: string | number) => {
      let index = titles.value.findIndex((item) => item.paneKey == value);
      if (titles.value.length == 0) {
        // console.warn('[NutUI] <Tabs> 当前未找到 TabPane 组件元素 , 请检查 .');
      } else if (index == -1) {
        // console.warn('[NutUI] <Tabs> 请检查 v-model 值是否为 paneKey ,如 paneKey 未设置，请采用下标控制 .');
      } else {
        currentIndex.value = index;
      }
    };
    const getScrollX = computed(() => {
      return props.titleScroll && props.direction === 'horizontal';
    });
    const getScrollY = computed(() => {
      return props.titleScroll && props.direction === 'vertical';
    });
    const titleRef = ref([]) as Ref<HTMLElement[]>;
    const scrollLeft = ref(0);
    const scrollTop = ref(0);
    const scrollWithAnimation = ref(false);
    const getRect = (selector: string) => {
      return new Promise((resolve) => {
        Taro.createSelectorQuery()
          .select(selector)
          .boundingClientRect()
          .exec((rect = []) => {
            resolve(rect[0]);
          });
      });
    };
    const getAllRect = (selector: string) => {
      return new Promise((resolve) => {
        Taro.createSelectorQuery()
          .selectAll(selector)
          .boundingClientRect()
          .exec((rect = []) => resolve(rect[0]));
      });
    };
    const navRectRef = ref();
    const titleRectRef = ref<RectItem[]>([]);
    const canShowLabel = ref(false);
    const scrollIntoView = () => {
      raf(() => {
        Promise.all([
          getRect(`#nut-tabs__titles_${refRandomId}`),
          getAllRect(`#nut-tabs__titles_${refRandomId} .nut-tabs__titles-item`)
        ]).then(([navRect, titleRects]: any) => {
          navRectRef.value = navRect;
          titleRectRef.value = titleRects;

          if (navRectRef.value) {
            if (props.direction === 'vertical') {
              const titlesTotalHeight = titleRects.reduce((prev: number, curr: RectItem) => prev + curr?.height, 0);
              if (titlesTotalHeight > navRectRef.value?.height) {
                canShowLabel.value = true;
              } else {
                canShowLabel.value = false;
              }
            } else {
              const titlesTotalWidth = titleRects.reduce((prev: number, curr: RectItem) => prev + curr?.width, 0);
              if (titlesTotalWidth > navRectRef.value?.width) {
                canShowLabel.value = true;
              } else {
                canShowLabel.value = false;
              }
            }
          }

          const titleRect: RectItem = titleRectRef.value[currentIndex.value];

          let to = 0;
          if (props.direction === 'vertical') {
            const DEFAULT_PADDING = 11;
            const top = titleRects
              .slice(0, currentIndex.value)
              .reduce((prev: number, curr: RectItem) => prev + curr?.height + 0, DEFAULT_PADDING);
            to = top - (navRectRef.value?.height - titleRect?.height) / 2;
          } else {
            const DEFAULT_PADDING = 31;
            const left = titleRects
              .slice(0, currentIndex.value)
              .reduce((prev: number, curr: RectItem) => prev + curr?.width + 20, DEFAULT_PADDING);
            to = left - (navRectRef.value?.width - titleRect?.width) / 2;
          }

          nextTick(() => {
            scrollWithAnimation.value = true;
          });

          scrollDirection(to, props.direction);
        });
      });
    };

    const scrollDirection = (to: number, direction: 'horizontal' | 'vertical') => {
      let count = 0;
      const from = direction === 'horizontal' ? scrollLeft.value : scrollTop.value;
      const frames = 1;

      function animate() {
        if (direction === 'horizontal') {
          scrollLeft.value += (to - from) / frames;
        } else {
          scrollTop.value += (to - from) / frames;
        }

        if (++count < frames) {
          raf(animate);
        }
      }

      animate();
    };
    const init = (vnodes: VNode[] = slots.default?.()) => {
      titles.value = [];
      vnodes = vnodes?.filter((item) => typeof item.children !== 'string');
      if (vnodes && vnodes.length) {
        renderTitles(vnodes);
      }
      findTabsIndex(props.modelValue);
      setTimeout(() => {
        scrollIntoView();
      }, 500);
    };

    watch(
      () => slots.default?.(),
      (vnodes: VNode[]) => {
        init(vnodes);
      }
    );
    watch(
      () => props.modelValue,
      (value: string | number) => {
        findTabsIndex(value);
        scrollIntoView();
      }
    );
    onMounted(init);
    onActivated(init);
    const tabMethods = {
      isBegin: () => {
        return currentIndex.value == 0;
      },
      isEnd: () => {
        return currentIndex.value == titles.value.length - 1;
      },
      next: () => {
        currentIndex.value += 1;
        tabMethods.updateValue(titles.value[currentIndex.value]);
      },
      prev: () => {
        currentIndex.value -= 1;
        tabMethods.updateValue(titles.value[currentIndex.value]);
      },
      updateValue: (item: Title) => {
        emit('update:modelValue', item.paneKey);
        emit('change', item);
      },
      tabChange: (item: Title, index: number) => {
        emit('click', item);
        if (item.disabled || currentIndex.value == index) {
          return;
        }
        currentIndex.value = index;
        tabMethods.updateValue(item);
      },
      setTabItemRef: (el: HTMLElement, index: number) => {
        titleRef.value[index] = el;
      }
    };
    const { tabsContentRef, touchState, touchMethods } = useTabContentTouch(props, tabMethods, Taro, useTaroRect);
    const contentStyle = computed(() => {
      let offsetPercent = currentIndex.value * 100;
      if (touchState.moving) {
        offsetPercent += touchState.offset;
      }
      let style: CSSProperties = {
        transform:
          props.direction == 'horizontal'
            ? `translate3d(-${offsetPercent}%, 0, 0)`
            : `translate3d( 0,-${offsetPercent}%, 0)`,
        transitionDuration: touchState.moving ? undefined : `${props.animatedTime}ms`
      };
      if (props.animatedTime == 0) {
        style = {};
      }
      return style;
    });
    const tabsNavStyle = computed(() => {
      return {
        background: props.background
      };
    });
    const tabsActiveStyle = computed(() => {
      return {
        color: props.type == 'smile' ? props.color : '',
        background: props.type == 'line' ? props.color : ''
      };
    });
    const titleStyle = computed(() => {
      if (!props.titleGutter) return {};
      const px = pxCheck(props.titleGutter);
      if (props.direction === 'vertical') {
        return { marginTop: px, marginBottom: px };
      }
      return { marginLeft: px, marginRight: px };
    });
    return {
      titles,
      tabsContentRef,
      contentStyle,
      tabsNavStyle,
      titleStyle,
      tabsActiveStyle,
      container,
      scrollLeft,
      scrollTop,
      getScrollX,
      getScrollY,
      scrollWithAnimation,
      canShowLabel,
      refRandomId,
      ...tabMethods,
      ...touchMethods
    };
  }
});
</script>
