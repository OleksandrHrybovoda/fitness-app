import { ActionReducerMap } from '@ngrx/store';
import { AppStateInterface } from './appState.interface';
import * as fromUser from '../auth/store/reducers';

export const appReducer: ActionReducerMap<AppStateInterface> = {
  user: fromUser.reducers,
};
