import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApiGuard} from "./guards/api.guard";
import {AccessGuard} from "./guards/access.guard";

const routes: Routes = [
  {
    path: 'events',
    canActivate: [ApiGuard],
    loadChildren: () => import('./events/events.module').then(m => m.EventsModule),
  }, {
    path: 'dashboard',
    canActivate: [ApiGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  }, {
    path: 'auth',
    canActivate: [AccessGuard],
    data: {guestOnly: true},
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  }, {
    path: '**',
    redirectTo: 'auth/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
