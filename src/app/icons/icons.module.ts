import {NgModule} from '@angular/core';

import {FeatherModule} from 'angular-feather';
import {Calendar, ChevronLeft, Clock, Edit, Loader, LogOut, Star, Trash, User} from 'angular-feather/icons';

// Select some icons (use an object, not an array)
const icons = {
  Edit,
  Trash,
  Clock,
  Calendar,
  User,
  Loader,
  Star,
  ChevronLeft,
  LogOut,
};

@NgModule({
  imports: [
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule {
}
