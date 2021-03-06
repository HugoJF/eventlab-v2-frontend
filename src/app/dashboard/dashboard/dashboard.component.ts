import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BadRequest, EventProperties, EventType} from "../../core/types/types";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Router} from "@angular/router";
import {mergeMap, take, takeUntil, tap} from "rxjs/operators";
import {EventsService} from "../../events/events.service";
import {PaginatorService} from "../../shared/paginator.service";
import {ModalService} from "../../shared/modal.service";
import {ToastService} from "../../shared/toast.service";
import {HttpErrorResponse} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {FormErrorHelperService} from "../../core/form-error-helper.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  host: {class: 'contents'}
})
export class DashboardComponent implements OnInit {
  fetchEvents = new BehaviorSubject<void>(undefined);

  events$!: Observable<EventType[]>;

  eventToLeave?: EventType;
  eventToDelete?: EventType;
  eventToEdit?: EventType;
  creatingEvent = false;

  CREATING_EVENT = 'CREATING_EVENT';
  EDITING_EVENT = 'EDITING_EVENT';
  LEAVING_EVENT = 'LEAVING_EVENT';
  DELETING_EVENT = 'DELETING_EVENT';

  storingEvent = false;
  updatingEvent = false;

  eventFormGroup = new FormGroup({});

  constructor(
    private backend: EventsService,
    private router: Router,
    private paginator: PaginatorService,
    private toastService: ToastService,
    private formError: FormErrorHelperService,
    public modalService: ModalService,
  ) {
  }

  ngOnInit(): void {
    this
      .paginator
      .onPagination
      .pipe(
        mergeMap(() => this.events$)
      )
      .subscribe();

    this.events$ = this
      .fetchEvents
      .pipe(
        mergeMap(() => this.backend.index())
      )
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
        tap(() => this.toastService.add({
          title: 'Participa????o cancelada com sucesso!',
          description: `Sua participa????o no evento ${this.eventToLeave?.title} foi cancelada.`,
          color: 'green',
        }, 5000)),
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
        tap(() => this.toastService.add({
          title: 'Participa????o confirmada com sucesso!',
          description: `Sua participa????o no evento ${this.eventToLeave?.title} foi confirmada.`,
          color: 'green',
        }, 5000)),
      )
      .subscribe(() => this.fetchEvents.next());
  }

  handleCreateSubmit($event: EventProperties) {
    this.storingEvent = true;
    this
      .backend
      .store($event)
      .pipe(
        take(1),
        tap(() => this.modalService.close(this.CREATING_EVENT)),
      )
      .subscribe(
        () => this.fetchEvents.next(),
        e => this.formError.handleError(this.eventFormGroup, e)
      )
    this.storingEvent = false;
  }

  handleUpdateSubmit($event: EventProperties) {
    this.updatingEvent = true;
    this
      .backend
      .update(this.eventToEdit!.id, $event)
      .pipe(
        take(1),
        tap(() => this.modalService.close(this.EDITING_EVENT)),
      )
      .subscribe(
        () => this.fetchEvents.next(),
        e => this.formError.handleError(this.eventFormGroup, e)
      )
    this.updatingEvent = false;
  }
}
