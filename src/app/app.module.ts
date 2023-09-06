import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { SeekerModule } from './seeker/seeker.module';

import { AuthService } from 'src/services/auth.service';
import { FormService } from 'src/services/form.service';
import { ConfigService } from 'src/services/config.service';
import { ExpertService } from 'src/services/expert.service';
import { AccountService } from 'src/services/account.service';
import { ContactService } from 'src/services/contact.service';

import { FormsValidations } from 'src/validations/expert-form';

import { HttpClientModule } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    SeekerModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    FormService,
    ConfigService,
    ExpertService,
    ContactService,
    AccountService,
    FormsValidations,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
