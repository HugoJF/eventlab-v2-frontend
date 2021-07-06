import {Component, Input, OnInit} from '@angular/core';
import {PaginatorService} from "../paginator.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit {
  page = 1;
  maxPages = 7;

  @Input() lastPage = 1;

  private readonly notifier = new Subject();

  constructor(private paginator: PaginatorService) {
  }

  ngOnInit(): void {
    this
      .paginator
      .onPagination
      .pipe(takeUntil(this.notifier))
      .subscribe(page => this.page = page);

    this
      .paginator
      .onLastPage
      .pipe(takeUntil(this.notifier))
      .subscribe(page => this.lastPage = page)
  }

  onPagination(page: number) {
    this.paginator.goTo(page);
  }

  pages() {
    const set = new Set<number>();

    let i = this.page;
    while (set.size <= Math.floor(this.maxPages / 2) && i > 0) {
      set.add(i--);
    }

    i = this.page;
    while (set.size <= Math.floor(this.maxPages) && i <= this.lastPage) {
      set.add(i++);
    }

    i = this.page;
    while (set.size <= Math.floor(this.maxPages) && i > 0) {
      set.add(i--);
    }

    return Array.from(set).sort((a, b) => a - b);
  }
}
