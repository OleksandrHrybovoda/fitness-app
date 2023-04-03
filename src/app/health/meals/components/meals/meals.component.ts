import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Meal } from 'src/app/core/models/meal.model';
import { MealsService } from 'src/app/health/shared/services/meals.service';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { getMealsSelector } from '../../store/selectors';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss'],
})
export class MealsComponent {
  meals!: Observable<Meal[] | undefined>;
  private readonly destroy$ = new Subject();

  constructor(
    private mealsService: MealsService,
    private store: Store<AppStateInterface>
  ) {}

  ngOnInit(): void {
    this.prepareToShowMeals();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private prepareToShowMeals(): void {
    this.meals = this.store.pipe(select(getMealsSelector));
    this.mealsService.getMeals().pipe(takeUntil(this.destroy$)).subscribe();
  }
}
