import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  host: {class: 'contents'}
})
export class BadgeComponent {
  @Input() title = '';
  @Input() icon?: string;

  constructor() {
  }

}
