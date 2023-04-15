import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  Observable,
  Subject,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as ScheduleActions from '../../schedule/store/actions';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  endAt,
  orderBy,
  query,
  startAt,
  updateDoc,
} from '@angular/fire/firestore';
import { ScheduleItem, ScheduleList } from 'src/app/core/models/schedule.model';
import { Workout } from 'src/app/core/models/workout.model';
import { Meal } from 'src/app/core/models/meal.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private date$ = new BehaviorSubject(new Date());
  private section$ = new Subject();
  private itemList$ = new Subject();

  items$ = this.itemList$.pipe(
    withLatestFrom(this.section$),
    map(([items, section]: any[]) => {
      const id = section.data.id;

      const defaults: ScheduleItem = {
        workouts: [] as Workout[],
        meals: [] as Meal[],
        section: section.section,
        timestamp: new Date(section.day).getTime(),
      };

      const payload = {
        ...(id ? section.data : defaults),
        ...items,
      };

      if (id) {
        return this.updateSection(id, payload);
      } else {
        return this.createSection(payload);
      }
    })
  );

  selected$ = this.section$.pipe(
    tap((next: any) =>
      this.store.dispatch(ScheduleActions.getSelected({ selected: next }))
    )
  );

  list$ = this.section$.pipe(
    map((value: any) => this.store.select(value.type)),
    tap((next: any) =>
      this.store.dispatch(ScheduleActions.getList({ list: next }))
    )
  );

  schedule$: Observable<ScheduleItem[]> = this.date$.pipe(
    tap((next) => {
      this.store.dispatch(ScheduleActions.getDate({ date: next }));
    }),
    map((day: any) => {
      const startAt = new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate()
      ).getTime();

      const endAt =
        new Date(
          day.getFullYear(),
          day.getMonth(),
          day.getDate() + 1
        ).getTime() - 1;

      return { startAt, endAt };
    }),
    switchMap(({ startAt, endAt }: any) => this.getSchedule(startAt, endAt)),
    map((data: any) => {
      const mapped: ScheduleList = {};

      for (const prop of data) {
        if (!mapped[prop.section]) {
          mapped[prop.section] = prop;
        }
      }

      return mapped;
    }),
    tap((next: any) =>
      this.store.dispatch(ScheduleActions.getSchedule({ schedule: next }))
    )
  );

  constructor(
    private store: Store<AppStateInterface>,
    private firestore: Firestore
  ) {}

  updateDate(date: Date): void {
    this.date$.next(date);
  }

  selectSection(event: any): void {
    this.section$.next(event);
  }

  updateItems(items: string[]): void {
    this.itemList$.next(items);
  }

  private async createSection(
    payload: ScheduleItem
  ): Promise<DocumentReference<DocumentData>> {
    const sectionRef = collection(this.firestore, 'schedule');
    const doc = addDoc(sectionRef, { ...payload });

    return doc.then((doc) => {
      return doc;
    });
  }

  private async updateSection(
    key: string,
    payload: ScheduleItem
  ): Promise<void> {
    const sectionRef = doc(this.firestore, 'menuItems', key);
    updateDoc(sectionRef, { ...payload });
  }

  getSchedule(
    startAtProperty: number,
    endAtProperty: number
  ): Observable<ScheduleItem[]> {
    return collectionData<ScheduleItem>(
      query<ScheduleItem>(
        collection(
          this.firestore,
          'schedule'
        ) as CollectionReference<ScheduleItem>,
        orderBy('timestamp'),
        startAt(startAtProperty),
        endAt(endAtProperty)
      ),
      {
        idField: 'id',
      }
    );
  }
}
