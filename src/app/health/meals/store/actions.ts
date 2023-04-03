import { createAction, props } from '@ngrx/store';
import { Meal } from 'src/app/core/models/meal.model';

export const getMeals = createAction(
  '[Meals] Get Meals',
  props<{ meals: Meal[] | undefined }>()
);
