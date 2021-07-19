import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EventProperties} from "../../core/types/types";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  host: {class: 'contents'}
})
export class EventFormComponent implements OnInit {
  @Output() onCancel = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<EventProperties>();

  loading = false;

  title = new FormControl('', [
    Validators.required,
  ]);

  description = new FormControl('', [
    Validators.required,
  ]);

  starts_at = new FormControl('', [
    Validators.required,
  ]);

  ends_at = new FormControl('', [
    Validators.required,
  ]);

  formGroup = new FormGroup({
    title: this.title,
    description: this.description,
    starts_at: this.starts_at,
    ends_at: this.ends_at,
  });

  constructor() {
  }

  ngOnInit(): void {
  }

  handleSubmit() {
    if (this.formGroup.invalid) {
      return;
    }

    this.onSubmit.emit(this.formGroup.value);
  }
}
