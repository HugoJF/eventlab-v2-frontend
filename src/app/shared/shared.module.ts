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
import {ModalConfirmComponent} from './modal/modal-confirm.component';
import {PortalModule} from "@angular/cdk/portal";
import {ModalDirective} from './modal.directive';
import { HeaderComponent } from './header/header.component';
import {ClassSwitchDirective} from "./class-switch.directive";
import {ModalHostComponent} from "./modal-host/modal-host.component";
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { ErrorComponent } from './error/error.component';

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
    ModalConfirmComponent,
    ModalHostComponent,
    ModalDirective,
    HeaderComponent,
    ClassSwitchDirective,
    ModalContainerComponent,
    ErrorComponent,
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
        ModalHostComponent,
        ModalConfirmComponent,
        ModalDirective,
        HeaderComponent,
        ClassSwitchDirective,
        ModalContainerComponent,
        ErrorComponent,
    ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    IconsModule,
    PortalModule
  ]
})
export class SharedModule {
}
