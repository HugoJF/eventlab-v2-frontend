import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EventProperties, EventType} from "../../core/types/types";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  host: {class: 'contents'}
})
export class EventFormComponent implements OnInit {
  @Output() onCancel = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<EventProperties>();

  loading = false;

  private _event: EventType | undefined;
  @Input() set event(event: EventType | undefined) {
    this._event = event;
    if (!event) {
      return;
    }
    const {title, description, starts_at, ends_at} = event;
    // https://stackoverflow.com/questions/49830032/how-to-assign-value-to-datetime-local-in-a-reactive-form
    this.formGroup.setValue({
      title,
      description,
      starts_at: new Date(starts_at).toISOString().substring(0, 16),
      ends_at: new Date(ends_at).toISOString().substring(0, 16),
    });
  }

  get event(): EventType | undefined {
    return this._event;
  }

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
