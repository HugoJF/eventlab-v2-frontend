import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../core/auth.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  host: {class: 'contents'}
})
export class LoginComponent implements OnInit {
  loading = false;
  error: number | boolean = false;

  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  password = new FormControl('', [
    Validators.required,
  ]);

  formGroup = new FormGroup({
    email: this.email,
    password: this.password,
  });

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  handleSubmit() {
    if (this.formGroup.invalid) {
      return;
    }

    this.loading = true
    this
      .auth
      .login({
        username: this.email.value,
        password: this.password.value,
      })
      .subscribe(
        success => this.router.navigateByUrl('/dashboard'),
        error => {
          if (!(error instanceof HttpErrorResponse)) {
            this.error = true;

            return;
          }

          this.loading = true;
          this.error = error.status;
        },
      );
  }

}
