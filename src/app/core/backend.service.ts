import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

type Options = Parameters<HttpClient['get']>[1];
const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  token: string = '';

  constructor(private http: HttpClient) {
    this.restoreToken();
  }

  private options(extra: Options) {
    return {
      ...extra,
      headers: {
        ...(extra?.headers ?? {}),
        Accept: 'application/json',
        Authorization: `Bearer ${this.token}`,
      }
    }
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
    this.token = token;
  }

  restoreToken() {
    this.token = localStorage.getItem(TOKEN_KEY) ?? '';
  }

  clearToken() {
    this.token = '';
    localStorage.removeItem(TOKEN_KEY);
  }

  url(path: string) {
    return `http://localhost:3000${path}`;
  }

  get<T>(path: string, extra: Options = {}) {
    return this.http.get<T>(this.url(path), this.options(extra));
  }

  post<T>(path: string, body: any = {}, extra: Options = {}) {
    return this.http.post<T>(this.url(path), body, this.options(extra));
  }

  patch<T>(path: string, body: any = {}, extra: Options = {}) {
    return this.http.patch<T>(this.url(path), body, this.options(extra));
  }

  delete<T>(path: string, extra: Options = {}) {
    return this.http.delete<T>(this.url(path), this.options(extra));
  }
}
