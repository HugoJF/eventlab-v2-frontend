import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../modal.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() action: string = '';

  constructor(private modal: ModalService) {
  }

  dismiss() {
    this.modal.clearRef();
  }
}
