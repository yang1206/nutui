import CalendarCard from './calendar-card.vue';
import type { ComponentPublicInstance } from 'vue';
import { withInstall } from '@/packages/utils';

withInstall(CalendarCard);

export type { CalendarCardProps } from './calendar-card.vue';

export type { CalendarCardType, CalendarCardDay, CalendarCardMonth, CalendarCardValue } from './types';

export type CalendarCardInstance = ComponentPublicInstance & InstanceType<typeof CalendarCard>;

export { CalendarCard, CalendarCard as default };
