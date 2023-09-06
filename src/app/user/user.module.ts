import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HistoryComponent } from './components/history/history.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { SharedModule } from '../shared/shared.module';
import { PasswordRecoveryComponent } from './pages/password-recovery/password-recovery.component';


@NgModule({
  declarations: [
    RegisterComponent,
    ProfileComponent,
    HistoryComponent,
    PersonalInfoComponent,
    DropdownComponent,
    PasswordRecoveryComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
