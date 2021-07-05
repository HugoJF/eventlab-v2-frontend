import {Component} from '@angular/core';
import {AuthService} from "./shared/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  host: {class: 'contents'}
})
export class AppComponent {
  title = 'tokenlab-v2';

  constructor(public auth: AuthService) {
  }
}
