import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';
import { SeekerComponent } from './seeker.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ContactSentComponent } from './pages/contact-sent/contact-sent.component';

const routes: Routes = [
  {
    path: '',
    component: SeekerComponent,
    children: [
      {
        path: '',
        component: SearchComponent
      },
      {
        path: 'profile/:id',
        component: ProfileComponent
      },
      {
        path: 'contact/:id',
        component: ContactComponent
      },
      {
        path: 'contact-sent/:token',
        component: ContactSentComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeekerRoutingModule { }
