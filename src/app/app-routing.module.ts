import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { AuthGuard } from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const appointmentsModule = () => import('./appointments/appointments.module').then(x=>x.AppointmentsModule)
const servicesModule =() => import('./services/services.module').then(x=>x.ServicesModule)

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
  { path: 'appointments', loadChildren: appointmentsModule, canActivate: [AuthGuard] },
  { path: 'services', loadChildren: servicesModule, canActivate: [AuthGuard] },
  { path: 'changepassword', component: ChangepasswordComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
