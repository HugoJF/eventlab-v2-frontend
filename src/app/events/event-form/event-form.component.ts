import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  host: {class: 'contents'}
})
export class EventFormComponent implements OnInit {

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

  constructor() {
  }

  ngOnInit(): void {
  }

  handleSubmit() {

  }
}
