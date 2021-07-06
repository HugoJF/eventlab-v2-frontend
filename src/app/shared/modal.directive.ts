import {Directive, Input, TemplateRef} from '@angular/core';
import {ModalService} from "./modal.service";

@Directive({
  selector: '[appModal]'
})
export class ModalDirective {

  constructor(private ref: TemplateRef<any>, private modal: ModalService) {
  }

  @Input()
  set appModal(value: any) {
    if (value) {
      this.modal.setRef(this.ref);
    } else {
      this.modal.clearRef();
    }
  }
}
