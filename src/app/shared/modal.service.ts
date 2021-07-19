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
  readonly onNewRef = new Subject<void>();

  addRef(id: string, ref: TemplateRef<any>) {
    this.refs[id] = {
      ref: ref,
      visible: false,
      sticky: true,
      opened_at: Date.now(),
    };
    this.onNewRef.next();
  }

  setVisible(id: string, open: boolean) {
    this.refs[id].visible = open;
    this.refs[id].opened_at = Date.now();
    this.onNewRef.next();
  }

  popModal() {
    const modals = Object.entries(this.refs);
    const order = modals.sort((a, b) => a[1].opened_at - b[1].opened_at);

    if (order.length === 0) {
      return;
    }

    const lastId = order[order.length - 1][0];
    const last = this.refs[lastId];

    if (last.sticky) {
      return;
    }

    this.setVisible(lastId, false);
  }
}
