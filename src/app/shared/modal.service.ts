import {Injectable, TemplateRef} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  ref?: TemplateRef<any>;

  readonly onRef = new Subject<void>();

  setRef(ref: TemplateRef<any>) {
    this.ref = ref;
    this.onRef.next();
  }

  clearRef() {
    this.ref = undefined;
    this.onRef.next();
  }
}
