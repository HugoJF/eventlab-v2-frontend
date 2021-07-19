import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EventsRoutingModule} from './events-routing.module';
import {SharedModule} from "../shared/shared.module";
import {IconsModule} from "../icons/icons.module";
import {EventListComponent} from "./event-list/event-list.component";
import {EventCardComponent} from "./event-card/event-card.component";
import {EventFormComponent} from "./event-form/event-form.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    EventListComponent,
    EventCardComponent,
    EventFormComponent,
  ],
  exports: [
    EventListComponent,
    EventCardComponent,
    EventFormComponent,
  ],
    imports: [
        CommonModule,
        EventsRoutingModule,
        SharedModule,
        IconsModule,
        ReactiveFormsModule,
    ]
})
export class EventsModule {
}
