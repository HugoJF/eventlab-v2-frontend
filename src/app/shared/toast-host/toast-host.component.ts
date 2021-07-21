import { Component, OnInit } from '@angular/core';
import {ToastService} from "../toast.service";

@Component({
  selector: 'app-toast-host',
  templateUrl: './toast-host.component.html'
})
export class ToastHostComponent implements OnInit {

  constructor(public toastService: ToastService) { }

  ngOnInit(): void {
  }

}
