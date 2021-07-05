import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, ValidationErrors, Validators} from "@angular/forms";

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
    Validators.minLength(8),
    (control: AbstractControl): ValidationErrors | null => {
      if (!this.password_confirmation || !this.password) {
        return null;
      }
      if (this.password.value !== this.password_confirmation.value) {
        return {mustEqual: 'password'}
      }
      return null;
    }
  ]);

  loading = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  handleSubmit() {

  }
}
