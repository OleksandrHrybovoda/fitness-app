import { ActionReducerMap } from '@ngrx/store';
import { AppStateInterface } from './appState.interface';
import * as fromUser from '../auth/store/reducers';
import * as fromMeals from '../health/meals/store/reducers';
import * as fromWorkouts from '../health/workouts/store/reducers';

export const appReducer: ActionReducerMap<AppStateInterface> = {
  user: fromUser.reducers,
  meals: fromMeals.reducers,
  workouts: fromWorkouts.reducers,
};
