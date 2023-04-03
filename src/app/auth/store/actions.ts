import { createAction, props } from '@ngrx/store';
import { User } from 'firebase/auth';

export const getUser = createAction('[User] Get User');

export const setUser = createAction(
  '[User] Set User',
  props<{ user: User | null }>()
);
