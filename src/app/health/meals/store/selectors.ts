import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';

export const selectFeature = (state: AppStateInterface) => state.meals;

export const getMealsSelector = createSelector(
  selectFeature,
  (state) => state?.meals
);
