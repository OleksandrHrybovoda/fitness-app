import { getUser } from './../../../store/actions';
import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  UserCredential,
  authState,
  signInWithEmailAndPassword,
  User,
} from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as UserActions from '../../../store/actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState: Observable<User | null>;
  constructor(private auth: Auth, private store: Store<AppStateInterface>) {
    this.authState = authState(this.auth).pipe(
      tap((user) => {
        if (!user) {
          this.store.dispatch(UserActions.setUser({ user: null }));
        } else {
          const activeUser = JSON.parse(JSON.stringify(user));
          this.store.dispatch(UserActions.setUser({ user: activeUser }));
        }
      })
    );
  }

  get user(): User | null {
    return this.auth.currentUser;
  }

  async login(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async signUp(email: string, password: string): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }

  async signOut(): Promise<void> {
    this.store.dispatch(UserActions.setUser({ user: null }));
    return await this.auth.signOut();
  }
}
