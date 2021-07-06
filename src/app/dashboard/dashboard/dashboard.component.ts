import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {EventType} from "../../core/types/types";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {take, takeUntil} from "rxjs/operators";
import {EventsService} from "../../shared/events.service";
import {PaginatorService} from "../../shared/paginator.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
  events: EventType[] = [];

  eventToBeLeft?: EventType;

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
    this
      .backend
      .delete(event)
      .pipe(take(1))
      .subscribe(() => this.getEvents());
  }

  handleOnLeave(event: EventType) {
    this.eventToBeLeft = event;

  }
  onLeave(event?: EventType) {
    this.eventToBeLeft = undefined;

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
        .index(this.paginator.getPage())
        .subscribe(response => {
          this.events = response.data;
          this.paginator.setLastPage(response.meta.last_page);
        })
  }
}
