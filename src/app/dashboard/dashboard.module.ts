import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {EventsModule} from "../events/events.module";
import {SharedModule} from "../shared/shared.module";
import {NgEmptyPipeModule} from "angular-pipes";


@NgModule({
  declarations: [
    DashboardComponent
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        EventsModule,
        SharedModule,
        NgEmptyPipeModule
    ]
})
export class DashboardModule {
}
