import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './shared/shared.module';

export const ROUTES: Routes = [
  {
    path: 'schedule',
    loadChildren: () =>
      import('./schedule/schedule.module').then((m) => m.ScheduleModule),
  },
  {
    path: 'meals',
    loadChildren: () =>
      import('./meals/meals.module').then((m) => m.MealsModule),
  },
  {
    path: 'workouts',
    loadChildren: () =>
      import('./workouts/workouts.module').then((m) => m.WorkoutsModule),
  },
  {
    path: '**',
    redirectTo: 'schedule',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(ROUTES)],
})
export class HealthModule {}
