import {Injectable, TemplateRef} from '@angular/core';
import {Subject} from "rxjs";

type ModalRef = {
  visible: boolean,
  ref: TemplateRef<any>,
  opened_at: number,
  sticky: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  refs: Record<string, ModalRef> = {};
  // TODO: is this needed
  readonly onNewRef = new Subject<void>();

  addRef(id: string, ref: TemplateRef<any>, sticky: boolean = false) {
    this.refs[id] = {
      ref: ref,
      visible: false,
      sticky: sticky,
      opened_at: Date.now(),
    };
  }

  close(id: string) {
    this.setVisible(id, false);
  }

  open(id: string) {
    this.setVisible(id, true);
  }

  setVisible(id: string, open: boolean) {
    this.refs[id].visible = open;
    this.refs[id].opened_at = Date.now();
    this.onNewRef.next();
  }

  setSticky(id: string, sticky: boolean) {
    this.refs[id].sticky = sticky;
  }

  closeLastModal() {
    const modals = Object.entries(this.refs);

    if (modals.length === 0) {
      return;
    }

    const orderEntries = modals.sort((a, b) => a[1].opened_at - b[1].opened_at);
    const lastEntry = orderEntries[orderEntries.length - 1];
    const [lastId, last] = lastEntry;

    if (last.sticky) {
      return;
    }

    this.close(lastId);
  }
}
