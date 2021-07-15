import {Injectable} from '@angular/core';
import {UserType} from "./types/types";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {LoginRequest} from "./types/auth";
import {switchMap, take, tap} from "rxjs/operators";
import {BackendService} from "./backend.service";

type LoginCredentials = {
  username: string;
  password: string;
}

// TODO: deprecated
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

  constructor(private api: BackendService, private router: Router) {
    this.fetchProfile().pipe(take(1)).subscribe()
  }

  private fetchProfile() {
    return this
      .api
      .get<UserType>('/auth/me')
      .pipe(
        tap(data => {
          this.setUser(data);
          this.router.navigateByUrl('/dashboard')
        })
      );
  }

  private fetchToken(credentials: LoginCredentials) {
    return this
      .api
      .post<LoginRequest>('/auth/login', credentials)
      .pipe(
        take(1),
        tap(logged => this.api.setToken(logged.access_token)),
      );
  }

  login(credentials: LoginCredentials) {
    this
      .fetchToken(credentials)
      .pipe(
        take(1),
        switchMap(() => this.fetchProfile()),
      )
      .subscribe()
  }

  logout() {
    this.setUser(null);
    this.api.clearToken();
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
