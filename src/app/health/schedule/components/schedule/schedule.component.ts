import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppStateInterface } from 'src/app/types/appState.interface';
import {
  getDateSelector,
  getListSelector,
  getScheduleSelector,
  getSelectedSelector,
} from '../../store/selectors';
import { ScheduleItem } from 'src/app/core/models/schedule.model';
import { ScheduleService } from 'src/app/health/shared/services/schedule.service';
import { Meal } from 'src/app/core/models/meal.model';
import { Workout } from 'src/app/core/models/workout.model';
import { MealsService } from 'src/app/health/shared/services/meals.service';
import { WorkoutsService } from 'src/app/health/shared/services/workouts.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit, OnDestroy {
  open = false;

  date$!: Observable<Date | undefined>;
  selected$!: Observable<any>;
  list$!: Observable<Meal[] | Workout[]>;
  schedule$!: Observable<ScheduleItem[] | undefined>;
  private readonly destroy$ = new Subject();

  constructor(
    private store: Store<AppStateInterface>,
    private scheduleService: ScheduleService,
    private mealsService: MealsService,
    private workoutsService: WorkoutsService
  ) {}

  ngOnInit(): void {
    this.prepareToShowSchedule();
  }

  assignItem(items: string[]): void {
    this.scheduleService.updateItems(items);
    this.closeAssign();
  }

  closeAssign(): void {
    this.open = false;
  }

  changeDate(date: Date): void {
    this.scheduleService.updateDate(date);
  }

  changeSection(event: any) {
    this.open = true;
    this.scheduleService.selectSection(event);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private prepareToShowSchedule(): void {
    this.date$ = this.store.pipe(select(getDateSelector));
    this.schedule$ = this.store.pipe(select(getScheduleSelector));
    this.selected$ = this.store.pipe(select(getSelectedSelector));
    this.list$ = this.store.pipe(select(getListSelector));

    this.scheduleService.schedule$.pipe(takeUntil(this.destroy$)).subscribe();
    this.scheduleService.selected$.pipe(takeUntil(this.destroy$)).subscribe();
    this.scheduleService.list$.pipe(takeUntil(this.destroy$)).subscribe();
    this.scheduleService.items$.pipe(takeUntil(this.destroy$)).subscribe();
    this.mealsService.getMeals().pipe(takeUntil(this.destroy$)).subscribe();
    this.workoutsService
      .getWorkouts()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
