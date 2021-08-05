import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {SharedModule} from "../shared/shared.module";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ReactiveFormsModule} from "@angular/forms";
import { LoadComponent } from './load/load.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoadComponent,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
