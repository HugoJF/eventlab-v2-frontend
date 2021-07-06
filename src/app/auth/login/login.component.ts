import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/auth.service";

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

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  handleSubmit() {
    this.auth.login();
    this.router.navigateByUrl('/dashboard');
  }
}
