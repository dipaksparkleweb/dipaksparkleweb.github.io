import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// used to create fake backend
//import { fakeBackendProvider } from 'src/app/_helpers';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from 'src/app/_helpers';
import { AppComponent } from 'src/app/app.component';
import { AlertComponent } from 'src/app/_components';
import { HomeComponent } from 'src/app/home';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbModule
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    ChangepasswordComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    //fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { };
