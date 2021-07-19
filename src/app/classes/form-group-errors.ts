import {FormGroup} from "@angular/forms";
import {BadRequest} from "../core/types/types";

export class FormGroupErrors {
  constructor(private formGroup: FormGroup) {
  }

  handleBadRequest(request: BadRequest) {
    for (const error of request.message) {
      const property = error.property;
      const constraints = error.constraints;

      this.setPropertyErrors(property, constraints);
    }
  }

  private setPropertyErrors(property: string, constraints: Record<string, string>) {
    const control = this.formGroup.controls[property];

    if (!control) {
      console.log('could not find control for property', property);
      return;
    }

    control.markAsTouched();
    for (const [code, message] of Object.entries(constraints)) {
      control.setErrors({[code]: message});
    }
  }
}
