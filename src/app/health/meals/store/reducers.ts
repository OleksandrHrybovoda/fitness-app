import { createReducer, on } from '@ngrx/store';
import * as UserActions from './actions';
import { Meal } from 'src/app/core/models/meal.model';

export const initialState: { meals: Meal[] | undefined } = {
  meals: undefined,
};

export const reducers = createReducer(
  initialState,
  on(UserActions.getMeals, (state, action) => ({
    ...state,
    meals: action.meals,
  }))
);
