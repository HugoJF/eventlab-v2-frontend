import {Injectable} from '@angular/core';

export type Color = 'gray' | 'green' | 'red' | 'yellow';

type Toast = {
  title: string;
  description: string;
  color?: Color;
}

type TaggedToast = Toast & {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  id = 0;
  toasts: TaggedToast[] = [];

  constructor() {
  }

  add(toast: Toast, duration: number): number {
    const id = ++this.id;

    this.toasts.push({
      id, ...toast
    });

    setTimeout(() => {
      this.remove(id);
    }, duration);

    return id;
  }

  remove(id: number): void {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
  }
}
