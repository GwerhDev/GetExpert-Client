import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FilterComponent } from './filter/filter.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { NavbarLayoutComponent } from './navbar-layout/navbar-layout.component';
import { ModalLoginUserComponent } from '../seeker/components/modal-login-user/modal-login-user.component';
import { ModalPasswordRecoveryComponent } from '../seeker/components/modal-password-recovery/modal-password-recovery.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SelectCmpComponent } from './select-cmp/select-cmp.component';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FilterComponent,
    SnackbarComponent,
    AuthLayoutComponent,
    NavbarLayoutComponent,
    ModalLoginUserComponent,
    ModalPasswordRecoveryComponent,
    UserProfileComponent,
    SelectCmpComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    FilterComponent,
    SnackbarComponent,
    AuthLayoutComponent,
    NavbarLayoutComponent,
    ModalLoginUserComponent,
    ModalPasswordRecoveryComponent,
    UserProfileComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
