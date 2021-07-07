import {Directive, ElementRef, Input, Renderer2} from '@angular/core';

type Switch = Record<string, string>;
type Cases = Record<string, Record<string, string>>;

@Directive({
  selector: '[appClassSwitch]'
})
export class ClassSwitchDirective {
  _addedClasses: Record<string, string> = {};
  _switch: Switch = {};
  _cases: Cases = {};

  @Input()
  set appClassSwitch(value: Switch) {
    this._switch = value;
    this.refresh();
  }

  @Input()
  set appClassCases(value: Cases) {
    this._cases = value;
    this.refresh();
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  refresh() {
    const variables = Object.keys(this._switch);

    for (const variable of variables) {
      const selected = this._switch[variable];
      const selectedClasses = this._cases[variable]?.[selected];

      if (selectedClasses) {
        this.addClasses(selectedClasses);
      }

      if (typeof this._addedClasses[variable] === 'string') {
        // this.renderer.removeClass(this.el.nativeElement, this._addedClasses);
        this.removeClasses(this._addedClasses[variable]);
      }

      this._addedClasses[variable] = selectedClasses;
    }
  }

  addClasses(classes: string) {
    const list = classes.split(' ');

    for (const c of list) {
      this.renderer.addClass(this.el.nativeElement, c);
    }
  }

  removeClasses(classes: string) {
    const list = classes.split(' ');

    for (const c of list) {
      this.renderer.removeClass(this.el.nativeElement, c);
    }
  }
}
