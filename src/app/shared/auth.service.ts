import {Injectable} from '@angular/core';
import {UserType} from "../core/types/types";
import {Router} from "@angular/router";
import {Subject} from "rxjs";

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
  user: UserType | null = null;

  readonly onAuth = new Subject<UserType | null>();

  constructor(private router: Router) {
    const data = localStorage.getItem('user');
    if (data) {
      this.user = JSON.parse(data) as UserType;
    }
  }


  login() {
    this.setUser(USER);
  }

  logout() {
    this.setUser(null);
    this.router.navigateByUrl('/login');
  }

  setUser(user: UserType | null) {
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
    this.onAuth.next(user);
  }

  getUser() {
    return this.user;
  }
}
