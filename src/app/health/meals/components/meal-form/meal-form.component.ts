import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
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
export class MealFormComponent implements OnInit {
  @Output()
  create = new EventEmitter<Meal>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  get required(): boolean | undefined {
    return (
      this.form.get('name')?.hasError('required') &&
      this.form.get('name')?.touched
    );
  }

  get ingredients(): FormArray<FormControl<string | null>> {
    return this.form.get('ingredients') as FormArray;
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

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      ingredients: this.fb.array(['']),
    });
  }
}
