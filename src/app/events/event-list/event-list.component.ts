import {Component, EventEmitter, Input, Output} from '@angular/core';
import {EventType} from "../../core/types/types";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html'
})
export class EventListComponent {
  @Input() events: EventType[] = [];

  @Output() onEdit = new EventEmitter<EventType>();
  @Output() onDelete = new EventEmitter<EventType>();
  @Output() onJoin = new EventEmitter<EventType>();
  @Output() onLeave = new EventEmitter<EventType>();

  constructor() {
  }

  handleOnEdit(event: EventType) {
    this.onEdit.emit(event);
  }

  handleOnDelete(event: EventType) {
    this.onDelete.emit(event);
  }

  handleOnLeave(event: EventType) {
    this.onLeave.emit(event);
  }

  handleOnJoin(event: EventType) {
    this.onJoin.emit(event);
  }
}
