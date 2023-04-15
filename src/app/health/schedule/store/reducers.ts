import { createReducer, on } from '@ngrx/store';
import * as ScheduleActions from './actions';
import { ScheduleItem } from 'src/app/core/models/schedule.model';

export const initialState: {
  date: Date | undefined;
  schedule: ScheduleItem[] | undefined;
  selected: any;
  list: any;
} = {
  date: undefined,
  schedule: undefined,
  selected: undefined,
  list: undefined,
};

export const reducers = createReducer(
  initialState,
  on(ScheduleActions.getDate, (state, action) => ({
    ...state,
    date: action.date,
  })),
  on(ScheduleActions.getSchedule, (state, action) => ({
    ...state,
    schedule: action.schedule,
  })),
  on(ScheduleActions.getSelected, (state, action) => ({
    ...state,
    schedule: action.selected,
  })),
  on(ScheduleActions.getList, (state, action) => ({
    ...state,
    schedule: action.list,
  }))
);
