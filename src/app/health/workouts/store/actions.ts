import { createAction, props } from '@ngrx/store';
import { Workout } from 'src/app/core/models/workout.model';

export const getWorkouts = createAction(
  '[Workouts] Get Workouts',
  props<{ workouts: Workout[] | undefined }>()
);
