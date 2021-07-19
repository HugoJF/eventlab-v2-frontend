import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {AuthService} from "../../core/auth.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {BadRequest} from "../../core/types/types";
import {FormGroupErrors} from "../../classes/form-group-errors";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  host: {class: 'contents'}
})
export class RegisterComponent implements OnInit {
  name = new FormControl('', [
    Validators.required,
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  password_confirmation = new FormControl('', [
    Validators.required,
    (control: AbstractControl): ValidationErrors | null => {
      if (!this.password_confirmation || !this.password) {
        return null;
      }
      if (this.password.value === this.password_confirmation.value) {
        return null;
      }
      return {mustEqual: 'password'}
    }
  ]);
  formGroup = new FormGroup({
    name: this.name,
    email: this.email,
    password: this.password,
    password_confirmation: this.password_confirmation,
  });
  formGroupErrors = new FormGroupErrors(this.formGroup);

  loading = false;
  error = false;

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  handleSubmit() {
    if (this.formGroup.invalid) {
      return;
    }

    this
      .auth
      .register(this.formGroup.value)
      .subscribe(
        success => this.router.navigateByUrl('/login'),
        errors => {
          if (!(errors instanceof HttpErrorResponse)) {
            this.error = true;

            return;
          }

          this.formGroupErrors.handleBadRequest(errors.error as BadRequest);
        },
      )
  }
}
