import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalService} from "../modal.service";
import {Portal, TemplatePortal} from '@angular/cdk/portal';

@Component({
  selector: 'app-modal-host',
  templateUrl: './modal-host.component.html'
})
export class ModalHostComponent implements OnInit {
  portals: any[] = [];
  @ViewChild('container') container?: ElementRef;

  constructor(
    private modal: ModalService,
    private viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnInit(): void {
    this.modal.onNewRef.subscribe(() => {
      this.updatePortal()
    });
    this.updatePortal();
  }

  updatePortal() {
    this.portals = this
      .orderedPortals()
      .filter(entries => entries[1].visible)
      .map(entry => ({
        ref: new TemplatePortal(entry[1].ref, this.viewContainerRef),
        info: entry[1],
      }))
  }

  orderedPortals() {
    const modals = Object.entries(this.modal.refs);

    return modals.sort((a, b) => a[1].opened_at - b[1].opened_at);
  }

  dismiss($event: MouseEvent) {
    // if user clicked directly the background
    if ($event.target === this.container?.nativeElement) {
      this.modal.closeLastModal();
    }
  }
}
