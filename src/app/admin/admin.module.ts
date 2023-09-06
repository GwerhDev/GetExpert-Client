import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { ListManagementComponent } from './list-management/list-management.component';
import { PendingExpertsComponent } from './pending-experts/pending-experts.component';

@NgModule({
  declarations: [
    AdminComponent,
    PendingExpertsComponent,
    ListManagementComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
  ],
})
export class AdminModule { }
