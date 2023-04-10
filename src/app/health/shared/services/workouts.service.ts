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
import { Observable, map, shareReplay, tap } from 'rxjs';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as WorkoutsActions from '../../workouts/store/actions';
import { Workout } from 'src/app/core/models/workout.model';
import { getWorkoutsSelector } from '../../workouts/store/selectors';

@Injectable({
  providedIn: 'root',
})
export class WorkoutsService {
  constructor(
    private firestore: Firestore,
    private store: Store<AppStateInterface>
  ) {}

  getWorkouts(): Observable<Workout[]> {
    return collectionData<Workout>(
      query<Workout>(
        collection(this.firestore, 'workouts') as CollectionReference<Workout>
      ),
      {
        idField: 'id',
      }
    ).pipe(
      tap((workouts) =>
        this.store.dispatch(WorkoutsActions.getWorkouts({ workouts }))
      ),
      shareReplay(1)
    );
  }

  getWorkout(id: string): Observable<Workout | undefined> {
    return this.store.pipe(
      select(getWorkoutsSelector),
      map((workouts) => workouts?.find((workout) => workout.id === id))
    );
  }

  async addWorkout(workout: Workout): Promise<string | void> {
    const discountRef = collection(this.firestore, 'workouts');
    const doc = addDoc(discountRef, { ...workout });

    return doc.then((doc) => {
      return doc.id;
    });
  }

  async updateWorkout(id: string, workout: Workout): Promise<void> {
    const restaurantRef = doc(this.firestore, 'workouts', id);
    updateDoc(restaurantRef, { ...workout });
  }

  async removeWorkout(id: string): Promise<void> {
    const promoItemRef = doc(this.firestore, 'workouts', id);
    deleteDoc(promoItemRef);
  }
}
