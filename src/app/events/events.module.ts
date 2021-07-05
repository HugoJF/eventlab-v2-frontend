import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EventsRoutingModule} from './events-routing.module';
import {SharedModule} from "../shared/shared.module";
import {IconsModule} from "../icons/icons.module";
import {EventListComponent} from "./event-list/event-list.component";
import {EventCardComponent} from "./event-card/event-card.component";
import {CreateEventComponent} from "./create-event/create-event.component";

@NgModule({
  declarations: [
    EventListComponent,
    EventCardComponent,
    CreateEventComponent,
  ],
  exports: [
    EventListComponent,
    EventCardComponent,
    CreateEventComponent,
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule,
    IconsModule,
  ]
})
export class EventsModule {
}
