import {Directive, Input, TemplateRef} from '@angular/core';
import {ModalService} from "./modal.service";

@Directive({
  selector: '[appModal]'
})
export class ModalDirective {
  private _id?: string;
  private _sticky?: boolean;

  constructor(
    private ref: TemplateRef<any>,
    private modalService: ModalService,
  ) {
  }

  @Input()
  set appModalSticky(sticky: boolean) {
    this._sticky = sticky;

    if (!this._id) {
      return;
    }

    this.modalService.setSticky(this._id, sticky);
  }

  @Input()
  set appModal(id: string) {
    this._id = id;
    this.modalService.addRef(id, this.ref, this._sticky);
  }
}
