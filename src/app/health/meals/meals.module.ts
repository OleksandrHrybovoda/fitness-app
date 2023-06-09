import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MealsComponent } from './components/meals/meals.component';
import { MealComponent } from './components/meal/meal.component';
import { MealFormComponent } from './components/meal-form/meal-form.component';
import { SharedModule } from '../shared/shared.module';

export const ROUTES: Routes = [
  { path: '', component: MealsComponent },
  { path: 'new', component: MealComponent },
  { path: ':id', component: MealComponent },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [MealsComponent, MealComponent, MealFormComponent],
})
export class MealsModule {}
