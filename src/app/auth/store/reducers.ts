import { createReducer, on } from '@ngrx/store';
import * as UserActions from './actions';
import { User } from 'firebase/auth';

export const initialState: { user: User | null } = {
  user: null,
};

export const reducers = createReducer(
  initialState,
  on(UserActions.getUser, (state) => ({ ...state, user: state.user })),
  on(UserActions.setUser, (state, action) => ({ ...state, user: action.user }))
);
