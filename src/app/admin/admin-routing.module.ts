import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingExpertsComponent } from './pending-experts/pending-experts.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: PendingExpertsComponent
      },
      {
        path: '',
        component: PendingExpertsComponent
      },    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
