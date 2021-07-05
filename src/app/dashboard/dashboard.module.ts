import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {EventsModule} from "../events/events.module";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    EventsModule,
    SharedModule
  ]
})
export class DashboardModule {
}
