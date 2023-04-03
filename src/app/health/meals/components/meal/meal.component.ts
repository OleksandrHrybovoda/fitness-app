import { Component } from '@angular/core';
import { Meal } from 'src/app/core/models/meal.model';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent {
  addMeal(event: Meal) {
    console.log('Meal:', event);
  }
}
