import { Injectable } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  collection,
  collectionData,
  query,
} from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';
import { Meal } from 'src/app/core/models/meal.model';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as MealsActions from '../../meals/store/actions';

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  constructor(
    private authService: AuthService,
    private firestore: Firestore,
    private store: Store<AppStateInterface>
  ) {}

  get uid(): string | undefined {
    return this.authService.user?.uid;
  }

  getMeals(): Observable<Meal[]> {
    return collectionData<Meal>(
      query<Meal>(
        collection(this.firestore, 'meals') as CollectionReference<Meal>
      ),
      {
        idField: 'id',
      }
    ).pipe(
      tap((meals) => this.store.dispatch(MealsActions.getMeals({ meals })))
    );
  }
}
