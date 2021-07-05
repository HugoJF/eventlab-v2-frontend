import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EventType, PaginatedResourceResponse} from "../core/types/types";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  defaultOptions = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer pog',
    }
  };

  constructor(private http: HttpClient) {
  }

  url(path: string) {
    return `http://tokenlab.test/api/v2${path}`;
  }

  get<T>(path: string) {
    return this.http.get<T>(this.url(path), this.defaultOptions);
  }

  post<T>(path: string, body: any = {}) {
    return this.http.post<T>(this.url(path), body, this.defaultOptions);
  }

  patch<T>(path: string, body: any = {}) {
    return this.http.patch<T>(this.url(path), body, this.defaultOptions);
  }

  delete<T>(path: string) {
    return this.http.delete<T>(this.url(path), this.defaultOptions);
  }

}
