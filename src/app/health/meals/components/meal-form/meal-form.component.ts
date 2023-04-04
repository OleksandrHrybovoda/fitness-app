import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Meal } from 'src/app/core/models/meal.model';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealFormComponent implements OnChanges {
  @Output()
  create = new EventEmitter<Meal>();

  @Output()
  update = new EventEmitter<Meal>();

  @Output()
  remove = new EventEmitter<Meal>();

  @Input()
  meal!: Meal;

  form!: FormGroup;

  toggled = false;
  exists = false;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!this.form) {
      this.initForm();
    }
    if (this.meal && this.meal.name && this.form) {
      this.exists = true;
      this.emptyIngredients();

      const value = this.meal;
      this.form?.patchValue({
        name: value.name,
      });

      if (value.ingredients) {
        for (const item of value.ingredients) {
          this.ingredients?.push(new FormControl(item));
        }
      }
    }
  }

  get required(): boolean | undefined {
    return (
      this.form.get('name')?.hasError('required') &&
      this.form.get('name')?.touched
    );
  }

  get ingredients(): FormArray<FormControl<string | null>> {
    return this.form?.get('ingredients') as FormArray;
  }

  emptyIngredients() {
    while (this.ingredients?.controls?.length) {
      this.ingredients.removeAt(0);
    }
  }

  addIngredient(): void {
    this.ingredients.push(new FormControl(''));
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  createMeal(): void {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateMeal() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeMeal() {
    this.remove.emit(this.form.value);
  }

  toggle() {
    this.toggled = !this.toggled;
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      ingredients: this.fb.array(['']),
    });
  }
}
