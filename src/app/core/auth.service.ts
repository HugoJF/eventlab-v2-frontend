import {Injectable} from '@angular/core';
import {UserType} from "./types/types";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {LoginCredentials, LoginRequest, RegisterCredentials} from "./types/auth";
import {switchMap, take, tap} from "rxjs/operators";
import {BackendService} from "./backend.service";

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
    return this
      .fetchToken(credentials)
      .pipe(
        take(1),
        switchMap(() => this.fetchProfile()),
      )
  }

  register(credentials: RegisterCredentials) {
    return this
      .api
      .post<UserType>('/auth/register', credentials)
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
