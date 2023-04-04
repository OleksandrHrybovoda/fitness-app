import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';

export const selectFeature = (state: AppStateInterface) => state.workouts;

export const getWorkoutsSelector = createSelector(
  selectFeature,
  (state) => state?.workouts
);
