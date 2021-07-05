import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EventsModule} from './events/events.module';
import {AuthModule} from './auth/auth.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {IconsModule} from "./icons/icons.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EventsModule,
    AuthModule,
    DashboardModule,
    IconsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
