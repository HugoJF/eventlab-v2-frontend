import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalService} from "../modal.service";
import {Portal, TemplatePortal} from '@angular/cdk/portal';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html'
})
export class ModalContainerComponent implements OnInit {
  portal?: Portal<any>;
  @ViewChild('container') container?: ElementRef;

  constructor(
    private modal: ModalService,
    private viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnInit(): void {
    this.modal.onRef.subscribe(() => {
      this.updatePortal()
    });
    this.updatePortal();
  }

  updatePortal() {
    if (!this.modal.ref) {
      this.portal = undefined;

      return;
    }

    this.portal = new TemplatePortal(this.modal.ref, this.viewContainerRef)
  }

  dismiss($event: MouseEvent) {
    // if user clicked directly the background
    if ($event.target === this.container?.nativeElement) {
      this.modal.clearRef();
    }
  }
}
