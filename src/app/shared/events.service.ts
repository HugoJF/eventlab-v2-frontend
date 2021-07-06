import { Injectable } from '@angular/core';
import {EventType, PaginatedResourceResponse, ResourceResponse} from "../core/types/types";
import {BackendService} from "./backend.service";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private api: BackendService) { }

  index(page: number = 1) {
    return this.api.get<PaginatedResourceResponse<EventType[]>>('/events?page=' + page)
  }

  join(event: EventType) {
    return this.api.post<ResourceResponse<EventType>>(`/events/${event.id}/join`);
  }

  leave(event: EventType) {
    return this.api.delete<ResourceResponse<EventType>>(`/events/${event.id}/leave`);
  }

  update(event: EventType) {
    return this.api.patch<ResourceResponse<EventType>>(`/events/${event.id}`, event);
  }

  delete(event: EventType) {
    return this.api.delete<ResourceResponse<EventType>>(`/events/${event.id}`);
  }
}
