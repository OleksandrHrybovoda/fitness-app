import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';

export const selectFeature = (state: AppStateInterface) => state.scheduleState;

export const getDateSelector = createSelector(
  selectFeature,
  (state) => state.date
);

export const getScheduleSelector = createSelector(
  selectFeature,
  (state) => state.schedule
);

export const getSelectedSelector = createSelector(
  selectFeature,
  (state) => state.selected
);

export const getListSelector = createSelector(
  selectFeature,
  (state) => state.list
);
