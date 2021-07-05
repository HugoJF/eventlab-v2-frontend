import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EventType, PaginatedResourceResponse, ResourceResponse} from "../core/types/types";

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
    return `http://tokenlab.test/api${path}`;
  }

  get<T>(path: string) {
    return this.http.get<T>(this.url(path), this.defaultOptions);
  }

  post<T>(path: string) {
    return this.http.post<T>(this.url(path), {}, this.defaultOptions);
  }

  delete<T>(path: string) {
    return this.http.delete<T>(this.url(path), this.defaultOptions);
  }

  events(page: number = 1) {
    return this.get<PaginatedResourceResponse<EventType[]>>('/events?page=' + page)
  }

  join(event: EventType) {
    return this.post<ResourceResponse<EventType>>(`/events/${event.id}/join`);
  }

  leave(event: EventType) {
    return this.delete<ResourceResponse<EventType>>(`/events/${event.id}/leave`);
  }
}
