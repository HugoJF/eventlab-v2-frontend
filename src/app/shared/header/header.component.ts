import {Component} from '@angular/core';
import {AuthService} from "../../core/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(public auth: AuthService) {
  }

}
