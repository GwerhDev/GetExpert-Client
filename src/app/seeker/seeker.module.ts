import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchComponent } from './pages/search/search.component';
import { SeekerComponent } from './seeker.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ContactSentComponent } from './pages/contact-sent/contact-sent.component';
import { ModalContactComponent } from './components/modal-contact/modal-contact.component';

import { UserModule } from '../user/user.module';
import { SharedModule } from '../shared/shared.module';
import { SeekerRoutingModule } from './seeker-routing.module';

@NgModule({
  declarations: [
    SearchComponent,
    ContactComponent,
    ProfileComponent,
    ModalContactComponent,
    ContactSentComponent,
    SeekerComponent,
  ],
  imports: [
    CommonModule,
    SeekerRoutingModule,
    SharedModule,
    UserModule
  ]
})
export class SeekerModule { }
