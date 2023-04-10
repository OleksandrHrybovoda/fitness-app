import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutsComponent } from './components/workouts/workouts.component';
import { WorkoutComponent } from './components/workout/workout.component';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { SharedModule } from '../shared/shared.module';
import { WorkoutTypeComponent } from './components/workout-type/workout-type.component';

export const ROUTES: Routes = [
  { path: '', component: WorkoutsComponent },
  { path: 'new', component: WorkoutComponent },
  { path: ':id', component: WorkoutComponent },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [WorkoutsComponent, WorkoutComponent, WorkoutFormComponent, WorkoutTypeComponent],
})
export class WorkoutsModule {}
