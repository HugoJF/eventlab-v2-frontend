import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaginatorService implements OnInit, OnDestroy {
  private page: number = 1;
  private lastPage: number = Infinity;

  private readonly notifier = new Subject<void>();

  readonly onPagination = new Subject<number>();
  readonly onLastPage = new Subject<number>();

  constructor(private router: Router, private activated: ActivatedRoute) {
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  ngOnInit(): void {
    this
      .activated
      .queryParams
      .pipe(takeUntil(this.notifier))
      .subscribe(params => {
        this.updatePage(params['page'] ?? 1);
      });
  }

  private updatePage(page: number) {
    this.page = page;
    this.router.navigate([], {
      queryParams: {page},
      queryParamsHandling: "merge",
    });
    this.emitOnPage();
  }

  private clampPage(page: number) {
    return Math.max(Math.min(page, this.lastPage), 1);
  }

  private emitOnPage() {
    this.onPagination.next(this.page);
  }

  nextPage() {
    this.updatePage(this.page + 1);
  }

  previousPage() {
    this.updatePage(this.page - 1);
  }

  goTo(page: number) {
    this.updatePage(page);
  }

  getPage() {
    return this.page;
  }

  setLastPage(lastPage: number) {
    this.lastPage = lastPage;
    this.onLastPage.next(lastPage);
  }
}
