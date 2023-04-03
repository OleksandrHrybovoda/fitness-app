import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';

export const selectFeature = (state: AppStateInterface) => state.user;

export const getUserSelector = createSelector(
  selectFeature,
  (state) => state?.user
);

export const setUserSelector = createSelector(
  selectFeature,
  (state) => state?.user
);
