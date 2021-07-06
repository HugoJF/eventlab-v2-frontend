import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  host: {class: 'contents'}
})
export class AppComponent {
  title = 'tokenlab-v2';

  constructor() {
  }
}
