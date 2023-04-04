import { createReducer, on } from '@ngrx/store';
import * as WorkoutActions from './actions';
import { Workout } from 'src/app/core/models/workout.model';

export const initialState: { workouts: Workout[] | undefined } = {
  workouts: undefined,
};

export const reducers = createReducer(
  initialState,
  on(WorkoutActions.getWorkouts, (state, action) => ({
    ...state,
    workouts: action.workouts,
  }))
);
