import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { Workout } from 'src/app/core/models/workout.model';
import { WorkoutsService } from 'src/app/health/shared/services/workouts.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
})
export class WorkoutComponent {
  workouts!: Observable<Workout | undefined>;

  private readonly destroy$ = new Subject();

  constructor(
    private workoutsService: WorkoutsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.workouts = this.activatedRoute.params.pipe(
      switchMap((params) => this.workoutsService.getWorkout(params['id'])),
      takeUntil(this.destroy$)
    );
  }

  async addWorkout(event: Workout) {
    await this.workoutsService.addWorkout(event);
    this.backToWorkouts();
  }

  async updateWorkout(event: Workout) {
    const key = this.activatedRoute.snapshot.params['id'];
    await this.workoutsService.updateWorkout(key, event);
    this.backToWorkouts();
  }

  async removeWorkout(event: Workout) {
    const key = this.activatedRoute.snapshot.params['id'];
    await this.workoutsService.removeWorkout(key);
    this.backToWorkouts();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private backToWorkouts() {
    this.router.navigate(['workouts']);
  }
}
