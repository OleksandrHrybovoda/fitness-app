import { Injectable } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  query,
} from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Observable, shareReplay, tap } from 'rxjs';
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
      tap((meals) => this.store.dispatch(MealsActions.getMeals({ meals }))),
      shareReplay(1)
    );
  }

  async addMeal(meal: Meal): Promise<string | void> {
    const discountRef = collection(this.firestore, 'meals');
    const doc = addDoc(discountRef, { ...meal });

    return doc.then((doc) => {
      return doc.id;
    });
  }

  async removeMeal(id: string): Promise<void> {
    const promoItemRef = doc(this.firestore, 'meals', id);
    deleteDoc(promoItemRef);
  }
}
