import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { Meal } from 'src/app/core/models/meal.model';
import { MealsService } from 'src/app/health/shared/services/meals.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit, OnDestroy {
  meal!: Observable<Meal | undefined>;

  private readonly destroy$ = new Subject();

  constructor(
    private mealsService: MealsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.meal = this.activatedRoute.params.pipe(
      switchMap((params) => this.mealsService.getMeal(params['id'])),
      takeUntil(this.destroy$)
    );
  }

  async addMeal(event: Meal): Promise<void> {
    await this.mealsService.addMeal(event);
    this.backToMeals();
  }

  async updateMeal(event: Meal) {
    const key = this.activatedRoute.snapshot.params['id'];
    await this.mealsService.updateMeal(key, event);
    this.backToMeals();
  }

  async removeMeal(event: Meal) {
    const key = this.activatedRoute.snapshot.params['id'];
    await this.mealsService.removeMeal(key);
    this.backToMeals();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private backToMeals(): void {
    this.router.navigate(['meals']);
  }
}
