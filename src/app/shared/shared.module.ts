import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BadgeComponent} from "./badge/badge.component";
import {ButtonComponent} from "./button/button.component";
import {ContainerComponent} from "./container/container.component";
import {FieldComponent} from "./field/field.component";
import {HeadComponent} from "./head/head.component";
import {InputComponent} from "./input/input.component";
import {PaginationComponent} from "./pagination/pagination.component";
import {TextareaComponent} from "./textarea/textarea.component";
import {TitleComponent} from "./title/title.component";
import {IconsModule} from "../icons/icons.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    BadgeComponent,
    ButtonComponent,
    ContainerComponent,
    FieldComponent,
    HeadComponent,
    InputComponent,
    PaginationComponent,
    TextareaComponent,
    TitleComponent,
  ],
  exports: [
    BadgeComponent,
    ButtonComponent,
    ContainerComponent,
    FieldComponent,
    HeadComponent,
    InputComponent,
    PaginationComponent,
    TextareaComponent,
    TitleComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    IconsModule
  ]
})
export class SharedModule {
}
