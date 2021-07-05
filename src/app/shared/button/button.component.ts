import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent implements OnInit {
  @Input() enabled = true;
  @Input() loading = false;
  @Input() color = 'primary';
  @Input() size = 'normal';
  @Input() class = '';

  constructor() {
  }

  ngOnInit(): void {
  }

}
