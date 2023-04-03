import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Meal } from 'src/app/core/models/meal.model';
import { MealsService } from 'src/app/health/shared/services/meals.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent {
  constructor(private mealsService: MealsService, private router: Router) {}

  async addMeal(event: Meal): Promise<void> {
    await this.mealsService.addMeal(event);
    this.backToMeals();
  }

  private backToMeals(): void {
    this.router.navigate(['meals']);
  }
}
