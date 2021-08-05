import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EventProperties, EventType} from "../../core/types/types";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  host: {class: 'contents'}
})
export class EventFormComponent implements OnInit {
  @Input() header!: string;
  @Input() loading = false;
  @Output() onCancel = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<EventProperties>();

  private _event: EventType | undefined;
  @Input() set event(event: EventType | undefined) {
    this._event = event;
    if (!event) {
      return;
    }
    const {title, description, starts_at, ends_at} = event;
    // https://stackoverflow.com/questions/49830032/how-to-assign-value-to-datetime-local-in-a-reactive-form
    this.title.setValue(title);
    this.description.setValue(description);
    this.starts_at.setValue(new Date(starts_at).toISOString().substring(0, 16));
    this.ends_at.setValue(new Date(ends_at).toISOString().substring(0, 16));
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

  @Input() set formGroup(fg: FormGroup) {
    this._formGroup = fg;
    fg.setControl('title', this.title);
    fg.setControl('description', this.description);
    fg.setControl('starts_at', this.starts_at);
    fg.setControl('ends_at', this.ends_at);
  }

  _formGroup = new FormGroup({
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
    if (this._formGroup.invalid) {
      return;
    }

    this.onSubmit.emit({
      title: this.title.value,
      description: this.description.value,
      starts_at: new Date(this.starts_at.value).toISOString(),
      ends_at: new Date(this.ends_at.value).toISOString(),
    });
  }
}
