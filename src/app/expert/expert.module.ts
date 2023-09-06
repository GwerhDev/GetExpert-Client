import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpertRoutingModule } from './expert-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ExpertComponent } from './expert.component';
import { Step1Component } from './components/step1/step1.component';
import { Step2Component } from './components/step2/step2.component';
import { Step3Component } from './components/step3/step3.component';
import { Step4Component } from './components/step4/step4.component';
import { Step5Component } from './components/step5/step5.component';
import { RegisterComponent } from './pages/register/register.component';
import { RegisterInfoComponent } from './pages/register-info/register-info.component';
import { RegisterSuccessComponent } from './pages/register-success/register-success.component';
import { ExpertProfileComponent } from './pages/expert-profile/expert-profile.component';
import { ExpertInfoComponent } from './components/expert-info/expert-info.component';
import { ExpertPersonalInfoComponent } from './components/expert-personal-info/expert-personal-info.component';
import { FormsModule } from '@angular/forms';
import { ExpertDropdownComponent } from './components/dropdown/expert-dropdown.component';
import { ExpertHistoryComponent } from './components/expert-history/expert-history.component';

@NgModule({
  declarations: [
    RegisterComponent,
    ExpertComponent,
    RegisterInfoComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
    RegisterSuccessComponent,
    ExpertDropdownComponent,
    ExpertHistoryComponent,
    ExpertProfileComponent,
    ExpertInfoComponent,
    ExpertPersonalInfoComponent
  ],
  imports: [
    CommonModule,
    ExpertRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [

  ],
})
export class ExpertModule { }
