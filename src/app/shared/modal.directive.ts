import {Directive, Input, TemplateRef} from '@angular/core';
import {ModalService} from "./modal.service";

@Directive({
  selector: '[appModal]'
})
export class ModalDirective {

  constructor(
    private ref: TemplateRef<any>,
    private modalService: ModalService,
  ) {
  }

  @Input()
  set appModal(id: any) {
    this.modalService.addRef(id, this.ref);
  }
}
