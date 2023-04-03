import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  @Output()
  submitted = new EventEmitter<FormGroup>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.emit(this.form);
    }
  }

  get passwordInvalid(): boolean | undefined {
    const control = this.form.get('password');
    return control?.hasError('required') && control.touched;
  }

  get emailFormat(): boolean | undefined {
    const control = this.form.get('email');
    return control?.hasError('email') && control.touched;
  }

  private initForm(): void {
    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }
}
