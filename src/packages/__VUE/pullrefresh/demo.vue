<template>
  <div class="demo">
    <nut-tabs v-model="data.tabsValue">
      <nut-tab-pane :title="translate('basic')">
        <nut-pull-refresh v-model="refresh" @refresh="refreshFun">
          <div class="pull-block">{{ translate('content') }}</div>
        </nut-pull-refresh>
      </nut-tab-pane>
      <nut-tab-pane :title="translate('customTxt')">
        <nut-pull-refresh
          v-model="refresh2"
          :complete-duration="1000"
          :loosing-txt="translate('loose')"
          :loading-txt="translate('load')"
          :complete-txt="translate('ok')"
          @refresh="refreshFun"
        >
          <template #pulling>
            <div>{{ translate('pull') }}</div>
          </template>
          <div class="pull-block">{{ translate('content') }}</div>
        </nut-pull-refresh>
      </nut-tab-pane>
      <nut-tab-pane :title="translate('listenerTxt')">
        <div class="parentpage">
          <nut-pull-refresh v-model="refresh" @refresh="refreshFun">
            <div v-for="item in data.refreshList2" :key="item" class="pull-letter">
              <div>{{ item }}</div>
            </div>
          </nut-pull-refresh>
        </div>
      </nut-tab-pane>
    </nut-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useTranslate } from '@/sites/assets/util/useTranslate';
import { showToast } from '@nutui/nutui';

const translate = useTranslate({
  'zh-CN': {
    basic: '基础用法',
    pullRefresh: '下拉刷新',
    customTxt: '自定义文案',
    listenerTxt: '自定义监听对象',
    content: '向下拉试试吧！',
    loose: '松开吧',
    load: '玩命加载中...',
    ok: '好啦',
    pull: '用力拉'
  },
  'en-US': {
    basic: 'Basic Usage',
    pullRefresh: 'Pull to refresh',
    customTxt: 'Custom Tips',
    listenerTxt: 'Customize the listener',
    content: 'Try to pull down!',
    loose: 'Relax',
    load: 'Desperate loading...',
    ok: 'Ok!',
    pull: 'Pull'
  }
});

const letter: any[] = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'IJ',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

const refresh = ref(false);
const refresh2 = ref(false);

const data = reactive({
  tabsValue: 0,
  customList: [],
  refreshList: new Array(10).fill(11),
  refreshList2: ([] as Array<any>).concat(letter)
});

const refreshFun = () => {
  setTimeout(() => {
    refresh.value = false;
    refresh2.value = false;

    showToast.text('刷新成功！');
  }, 3000);
};
</script>

<style lang="scss" scoped>
.demo {
  padding-left: 0 !important;
  padding-right: 0 !important;
  padding-bottom: 0 !important;
}

.nut-tab-pane {
  padding: 0;
}

.nut-pull-refresh {
  height: calc(100vh - 107px);
}

.pull-block {
  text-align: center;
  color: #999;
  font-size: 16px;
  padding-top: 60px;
}

.pull-letter {
  font-size: 14px;
  color: #333;
  padding: 12px 0 12px 20px;
  border-top: 1px solid #eee;
}

.parentpage {
  height: 600px;
  overflow: auto;
}
</style>
