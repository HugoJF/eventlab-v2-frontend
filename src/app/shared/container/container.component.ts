import {Component} from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  host: {class: 'contents'}
})
export class ContainerComponent {
  constructor() {
  }
}
