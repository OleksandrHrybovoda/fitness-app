import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Workout } from 'src/app/core/models/workout.model';
import { WorkoutsService } from 'src/app/health/shared/services/workouts.service';
import { getWorkoutsSelector } from '../../store/selectors';
import { AppStateInterface } from 'src/app/types/appState.interface';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss'],
})
export class WorkoutsComponent {
  workouts!: Observable<Workout[] | undefined>;
  private readonly destroy$ = new Subject();

  constructor(
    private store: Store<AppStateInterface>,
    private workoutsService: WorkoutsService
  ) {}

  ngOnInit() {
    this.prepareToShowWorkouts();
  }

  removeWorkout(event: Workout) {
    this.workoutsService.removeWorkout(event.id);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private prepareToShowWorkouts(): void {
    this.workouts = this.store.pipe(select(getWorkoutsSelector));
    this.workoutsService
      .getWorkouts()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
