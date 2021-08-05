import {Injectable} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {BadRequest} from "./types/types";

@Injectable({
  providedIn: 'root'
})
export class FormErrorHelperService {
  handleError(formGroup: FormGroup, e: Error) {
    if (!(e instanceof HttpErrorResponse)) {
      return;
    }
    const error = e.error as BadRequest;
    const messages = error.message;

    for (const message of messages) {
      const control = formGroup.controls[message.property];
      if (!control) {
        continue;
      }
      control.setErrors(message.constraints);
    }
  }
}
