import Collapse from './collapse.taro.vue';
import type { ComponentPublicInstance } from 'vue';
import { withInstall } from '@/packages/utils';

withInstall(Collapse);

export type { CollapseProps } from './collapse.taro.vue';

export type { CollapseValue } from './types';

export type CollapseInstance = ComponentPublicInstance & InstanceType<typeof Collapse>;

export { Collapse, Collapse as default };
