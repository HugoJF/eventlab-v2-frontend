import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {EventProperties, EventType} from "../../core/types/types";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Router} from "@angular/router";
import {mergeMap, take, takeUntil, tap} from "rxjs/operators";
import {EventsService} from "../../events/events.service";
import {PaginatorService} from "../../shared/paginator.service";
import {ModalService} from "../../shared/modal.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  host: {class: 'contents'}
})
export class DashboardComponent implements OnInit, OnDestroy {
  fetchEvents = new BehaviorSubject<void>(undefined);

  events$!: Observable<EventType[]>;

  eventToLeave?: EventType;
  eventToDelete?: EventType;
  eventToEdit?: EventType;
  creatingEvent = false;

  notifier = new Subject();

  @ViewChild('modal') modal!: TemplateRef<unknown>;

  CREATING_EVENT = 'CREATING_EVENT';
  EDITING_EVENT = 'EDITING_EVENT';
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
    this
      .paginator
      .onPagination
      .pipe(
        takeUntil(this.notifier),
        mergeMap(() => this.events$)
      )
      .subscribe();

    this.events$ = this
      .fetchEvents
      .pipe(
        takeUntil(this.notifier),
        mergeMap(() => this.backend.index())
      )
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  handleOnEdit(event: EventType) {
    this.eventToEdit = event;
    this.modalService.open(this.EDITING_EVENT);
  }

  handleOnDelete(event: EventType) {
    this.eventToDelete = event;
    this.modalService.open(this.DELETING_EVENT);
  }

  onDelete(event?: EventType) {
    if (!event) {
      return;
    }
    this
      .backend
      .delete(event)
      .pipe(
        take(1),
        tap(() => this.eventToDelete = undefined),
        tap(() => this.modalService.close(this.DELETING_EVENT)),
      )
      .subscribe(() => this.fetchEvents.next());
  }

  handleOnLeave(event: EventType) {
    this.eventToLeave = event;
    this.modalService.open(this.LEAVING_EVENT);
  }

  onLeave(event?: EventType) {
    if (!event) {
      return;
    }

    this
      .backend
      .leave(event)
      .pipe(
        take(1),
        tap(() => this.modalService.close(this.LEAVING_EVENT)),
        tap(() => this.eventToLeave = undefined),
      )
      .subscribe(() => this.fetchEvents.next());
  }

  handleOnJoin(event: EventType) {
    this
      .backend
      .join(event)
      .pipe(
        take(1),
      )
      .subscribe(() => this.fetchEvents.next());
  }

  handleCreateSubmit($event: EventProperties) {
    this
      .backend
      .store($event)
      .pipe(
        take(1),
        tap(() => this.modalService.close(this.CREATING_EVENT)),
      )
      .subscribe(() => this.fetchEvents.next())
  }

  handleUpdateSubmit($event: EventProperties) {
    this
      .backend
      .update(this.eventToEdit!.id, $event)
      .pipe(
        take(1),
        tap(() => this.modalService.close(this.EDITING_EVENT)),
      )
      .subscribe(() => this.fetchEvents.next())
  }
}
