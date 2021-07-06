import {Injectable} from '@angular/core';
import {UserType} from "../core/types/types";
import {Router} from "@angular/router";

const USER = {
  id: 1,
  name: 'Asd',
  email: 'asd@asd.com',
  created_at: '2021-06-15T13:54:44.000000Z',
  updated_at: '2021-06-15T13:54:44.000000Z',
  email_verified_at: '2021-06-15T13:54:44.000000Z',
  two_factor_recovery_codes: null,
  two_factor_secret: null,
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user?: UserType = USER;

  constructor(private router: Router) {
  }

  login() {
    this.user = USER;
  }

  logout() {
    this.user = undefined;
    this.router.navigateByUrl('/login');
  }

  getUser() {
    return this.user;
  }
}
