import { createAction, props } from '@ngrx/store';
import { ScheduleItem } from 'src/app/core/models/schedule.model';

export const getDate = createAction(
  '[Schedule] Get Date',
  props<{ date: Date | undefined }>()
);

export const getSchedule = createAction(
  '[Schedule] Get Schedule',
  props<{ schedule: ScheduleItem[] | undefined }>()
);

export const getSelected = createAction(
  '[Schedule] Get Selected',
  props<{ selected: any }>()
);

export const getList = createAction(
  '[Schedule] Get List',
  props<{ list: any }>()
);
