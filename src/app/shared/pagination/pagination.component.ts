import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {
  current = 5;

  @Input() lastPage = 10;
  @Input() maxPages = 7;

  constructor(private router: Router) {
  }

  goTo(page: number) {
    this.current = page;
    this.router.navigate([], {
      queryParams: {page},
      queryParamsHandling: "merge",
    })
  }

  pages() {
    const set = new Set<number>();

    let i = this.current;
    while (set.size <= Math.floor(this.maxPages / 2) && i > 0) {
      set.add(i--);
    }

    i = this.current;
    while (set.size <= Math.floor(this.maxPages) && i <= this.lastPage) {
      set.add(i++);
    }

    i = this.current;
    while (set.size <= Math.floor(this.maxPages) && i > 0) {
      set.add(i--);
    }

    return Array.from(set).sort((a, b) => a - b);
  }
}
