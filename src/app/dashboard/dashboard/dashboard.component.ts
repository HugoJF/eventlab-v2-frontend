import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {EventType} from "../../core/types/types";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {take, takeUntil} from "rxjs/operators";
import {EventsService} from "../../events/events.service";
import {PaginatorService} from "../../shared/paginator.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  host: {class: 'contents'}
})
export class DashboardComponent implements OnInit, OnDestroy {
  events: EventType[] = [];

  eventToLeave?: EventType;
  eventToDelete?: EventType;

  notifier = new Subject();

  @ViewChild('modal') modal!: TemplateRef<unknown>;

  constructor(
    private backend: EventsService,
    private router: Router,
    private paginator: PaginatorService,
  ) {
  }

  ngOnInit(): void {
    this.getEvents();
    this
      .paginator
      .onPagination
      .pipe(takeUntil(this.notifier))
      .subscribe(() => {
        this.getEvents();
      });
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  handleOnEdit(event: EventType) {
    this
      .backend
      .update(event)
      .pipe(take(1))
      .subscribe(() => this.getEvents());
  }

  handleOnDelete(event: EventType) {
    this.eventToDelete = event;
  }

  onDelete(event?: EventType) {
    this.eventToDelete = undefined;

    if (!event) {
      return;
    }

    this
      .backend
      .delete(event)
      .pipe(take(1))
      .subscribe(() => this.getEvents());
  }

  handleOnLeave(event: EventType) {
    this.eventToLeave = event;
  }

  onLeave(event?: EventType) {
    this.eventToLeave = undefined;

    if (!event) {
      return;
    }

    this
      .backend
      .leave(event)
      .pipe(take(1))
      .subscribe(() => this.getEvents());
  }

  handleOnJoin(event: EventType) {
    this
      .backend
      .join(event)
      .pipe(take(1))
      .subscribe(() => this.getEvents());
  }

  getEvents() {
    this.backend
        .index()
        .subscribe(response => {
          this.events = response;
          console.log(Object.values(response));
          // this.events = response.data;
          // this.paginator.setLastPage(response.meta.last_page);
        })
  }
}
