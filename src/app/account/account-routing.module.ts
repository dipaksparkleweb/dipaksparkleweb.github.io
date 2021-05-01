import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { ResetpasswordsComponent } from './resetpassword.component';
import { VerifypasswordsComponent } from './verifypassword.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'resetpassword', component: ResetpasswordsComponent },
      { path: 'verifypassword', component: VerifypasswordsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
