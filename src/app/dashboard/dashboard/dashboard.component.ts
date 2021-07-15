import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {EventType} from "../../core/types/types";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {take, takeUntil} from "rxjs/operators";
import {EventsService} from "../../events/events.service";
import {PaginatorService} from "../../shared/paginator.service";
import {ModalService} from "../../shared/modal.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  host: {class: 'contents'}
})
export class DashboardComponent implements OnInit, OnDestroy {
  events: EventType[] = [];

  eventToLeave?: EventType;
  eventToDelete?: EventType;
  creatingEvent = false;

  notifier = new Subject();

  @ViewChild('modal') modal!: TemplateRef<unknown>;

  CREATING_EVENT = 'CREATING_EVENT';
  LEAVING_EVENT = 'LEAVING_EVENT';
  DELETING_EVENT = 'DELETING_EVENT';

  constructor(
    private backend: EventsService,
    private router: Router,
    private paginator: PaginatorService,
    public modalService: ModalService,
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
    this.modalService.setVisible(this.DELETING_EVENT, true);
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
    this.modalService.setVisible(this.LEAVING_EVENT, true);
    console.log(this.eventToLeave);
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
