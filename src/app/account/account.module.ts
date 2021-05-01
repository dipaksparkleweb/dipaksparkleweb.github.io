import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { ResetpasswordsComponent } from './resetpassword.component';
import { VerifypasswordsComponent } from './verifypassword.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule
  ],
  declarations: [
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    ResetpasswordsComponent,
    VerifypasswordsComponent
  ]
})
export class AccountModule {
  constructor()
  {
      console.log("appoiaccountntment")
  }
 }
