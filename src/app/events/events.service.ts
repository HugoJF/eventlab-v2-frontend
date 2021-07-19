import {Injectable} from '@angular/core';
import {EventProperties, EventType} from "../core/types/types";
import {BackendService} from "../core/backend.service";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private api: BackendService) { }

  index() {
    return this.api.get<EventType[]>('/events')
  }

  store(event: EventProperties) {
    return this.api.post<EventType>(`/events`, event);
  }

  update(event: EventType) {
    return this.api.patch<EventType>(`/events/${event.id}`, event);
  }

  delete(event: EventType) {
    return this.api.delete<EventType>(`/events/${event.id}`);
  }
  join(event: EventType) {
    return this.api.post<EventType>(`/events/${event.id}/presence`);
  }

  leave(event: EventType) {
    return this.api.delete<EventType>(`/events/${event.id}/presence`);
  }

}
