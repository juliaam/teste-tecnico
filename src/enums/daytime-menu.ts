import { DayTime } from '@prisma/client';

export type TDayTime = keyof typeof DayTime;

export const DayTimeEnum = {
  ...DayTime,
};
