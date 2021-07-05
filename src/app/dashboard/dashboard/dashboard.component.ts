import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {EventType} from "../../core/types/types";
import {Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {take, takeUntil} from "rxjs/operators";
import {EventsService} from "../../shared/events.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnChanges, OnDestroy {
  events: EventType[] = [];
  page = 1;

  notifier = new Subject();

  constructor(private backend: EventsService, private activated: ActivatedRoute, private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['page']) {
      this.getEvents();
    }
  }

  ngOnInit(): void {
    this
      .activated
      .queryParams
      .pipe(takeUntil(this.notifier))
      .subscribe(params => {
        this.page = params['page'] ?? 1;
        this.getEvents();
      });
  }


  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  handleOnEdit(event: EventType) {

  }

  handleOnDelete(event: EventType) {
    this.backend.delete(event)
  }

  handleOnLeave(event: EventType) {
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

  run() {
    this.router.navigate([], {
      queryParams: {page: ++this.page},
      queryParamsHandling: "merge",
    })
  }

  getEvents() {
    this.backend
        .index(this.page)
        .subscribe(response => this.events = response.data)
  }
}
