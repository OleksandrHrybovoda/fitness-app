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
  updateDoc,
} from '@angular/fire/firestore';
import { Store, select } from '@ngrx/store';
import { Observable, filter, map, of, shareReplay, tap } from 'rxjs';
import { Meal } from 'src/app/core/models/meal.model';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as MealsActions from '../../meals/store/actions';
import { getMealsSelector } from '../../meals/store/selectors';

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  constructor(
    private firestore: Firestore,
    private store: Store<AppStateInterface>
  ) {}

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

  getMeal(id: string): Observable<Meal | undefined> {
    if (!id) return of(undefined);
    return this.store.pipe(select(getMealsSelector)).pipe(
      filter(Boolean),
      map((meals) => meals.find((meal) => meal.id === id))
    );
  }

  async addMeal(meal: Meal): Promise<string | void> {
    const discountRef = collection(this.firestore, 'meals');
    const doc = addDoc(discountRef, { ...meal });

    return doc.then((doc) => {
      return doc.id;
    });
  }

  async updateMeal(id: string, meal: Meal): Promise<void> {
    const restaurantRef = doc(this.firestore, 'meals', id);
    updateDoc(restaurantRef, { ...meal });
  }

  async removeMeal(id: string): Promise<void> {
    const promoItemRef = doc(this.firestore, 'meals', id);
    deleteDoc(promoItemRef);
  }
}
