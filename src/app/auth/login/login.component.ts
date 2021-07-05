import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";

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

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  handleSubmit() {
    this.router.navigateByUrl('/dashboard');
  }
}
