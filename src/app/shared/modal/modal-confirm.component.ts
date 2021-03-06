import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalService} from "../modal.service";

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html'
})
export class ModalConfirmComponent {
  @Input() title: string = '';
  @Input() action: string = '';

  @Output() onConfirmation = new EventEmitter();
  @Output() onDismiss = new EventEmitter();

  dismiss() {
    this.onDismiss.emit();
  }
}
