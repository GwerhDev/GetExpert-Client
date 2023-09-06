import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./seeker/seeker.module').then( m => m.SeekerModule )
  },
  {
    path: "expert",
    loadChildren: () => import('./expert/expert.module').then( m => m.ExpertModule )
  },
  {
    path: "user",
    loadChildren: () => import('./user/user.module').then( m => m.UserModule )
  },
  {
    path: "login",
    loadChildren: () => import('./login/login.module').then( m => m.LoginModule )
  },
  {
    path: "auth",
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: "admin",
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
