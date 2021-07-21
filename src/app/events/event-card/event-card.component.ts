import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AuthService} from "../../core/auth.service";
import {EventType} from "../../core/types/types";

@Component({
  selector: 'app-event[event]',
  templateUrl: './event-card.component.html',
  host: {class: 'contents'},
})
export class EventCardComponent implements OnInit, OnChanges {
  @Input() event!: EventType;
  @Input() controls = true;

  @Output() onEdit = new EventEmitter<EventType>();
  @Output() onDelete = new EventEmitter<EventType>();
  @Output() onJoin = new EventEmitter<EventType>();
  @Output() onLeave = new EventEmitter<EventType>();

  startsAt!: Date;
  endsAt!: Date;

  constructor(private auth: AuthService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.parseDates();
  }

  ngOnInit(): void {
    this.parseDates()
  }

  handleOnEdit() {
    this.onEdit.emit();
  }

  handleOnDelete() {
    this.onDelete.emit();
  }

  handleOnLeave() {
    this.onLeave.emit();
  }

  handleOnJoin() {
    this.onJoin.emit();
  }

  userInEvent() {
    return this.event.participants.some(user => user.id === this.auth.getUser()!.id);
  }

  parseDates() {
    this.startsAt = new Date(this.event.starts_at);
    this.endsAt = new Date(this.event.ends_at);
  }

  diffInDays() {
    const prefixes = ['ms', 'segundos', 'minutos', 'horas', 'dias'];
    const mults = [1, 1000, 60, 60, 24];
    const startsAt = Date.parse(this.startsAt.toUTCString());
    const endsAt = Date.parse(this.endsAt.toUTCString());
    let delta = endsAt - startsAt;
    let i = 0;

    while (i < prefixes.length - 1 && delta > mults[i]) {
      delta /= mults[++i];
    }

    return [Math.round(delta), prefixes[i]].join(' ')
  }
}
