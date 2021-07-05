import {Component, Input, OnInit} from '@angular/core';
import {UserType} from "../../core/types/types";

type Color = 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink';
const keys = ['gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'];

@Component({
  selector: 'app-head[user]',
  templateUrl: './head.component.html'
})
export class HeadComponent implements OnInit {
  @Input() user!: UserType;
  @Input() color: Color = 'blue';

  initials = '';

  constructor() {
  }

  ngOnInit(): void {
    this.updateInitials();
    this.setRandomColor();
  }

  updateInitials() {
    const parts = this.user.name.split(' ');
    const letters = parts.map(part => part.substr(0, 1));

    this.initials = letters.join('').substr(0, 2);
  }

  setRandomColor() {
    this.color = keys[Math.floor(Math.random() * keys.length)] as Color;
  }
}
