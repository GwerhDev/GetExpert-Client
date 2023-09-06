import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { ExpertComponent } from './expert.component';
import { RegisterInfoComponent } from './pages/register-info/register-info.component';
import { RegisterSuccessComponent } from './pages/register-success/register-success.component';
import { ExpertProfileComponent } from './pages/expert-profile/expert-profile.component';

const routes: Routes = [
  {
    path: '',
    component: ExpertComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'register-info',
        component: RegisterInfoComponent
      },
      {
        path: 'register-success',
        component: RegisterSuccessComponent
      },
      {
        path: 'profile',
        component: ExpertProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpertRoutingModule { }
