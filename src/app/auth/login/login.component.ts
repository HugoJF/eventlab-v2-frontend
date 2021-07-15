import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../core/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  host: {class: 'contents'}
})
export class LoginComponent implements OnInit {
  loading = false;

  email = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
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
    this.auth.login({
      username: this.email.value,
      password: this.password.value,
    });
    this.router.navigateByUrl('/dashboard');
  }

}
