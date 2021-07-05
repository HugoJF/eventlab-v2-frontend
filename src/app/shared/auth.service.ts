import {Injectable} from '@angular/core';
import {UserType} from "../core/types/types";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user?: UserType = {
    id: 1,
    name: 'Asd',
    email: 'asd@asd.com',
    created_at: '2021-06-15T13:54:44.000000Z',
    updated_at: '2021-06-15T13:54:44.000000Z',
    email_verified_at: '2021-06-15T13:54:44.000000Z',
    two_factor_recovery_codes: null,
    two_factor_secret: null,
  };

  constructor() {
  }

  getUser() {
    return this.user;
  }
}
