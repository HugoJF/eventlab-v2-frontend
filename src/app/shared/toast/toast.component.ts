import {Component, Input, OnInit} from '@angular/core';
import {Color} from "../toast.service";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html'
})
export class ToastComponent implements OnInit {
  @Input() title!: string;
  @Input() description!: string;
  @Input() color: Color = 'gray';

  colorMap: Record<Color, string> = {
    gray: 'text-gray-600',
    green: 'text-green-600',
    red: 'text-red-600',
    yellow: 'text-yellow-600',
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  titleClass() {
    return `${this.colorMap[this.color]} font-bold`;
  }
}
