import { Component, ElementRef, EventEmitter, OnInit, Output, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/services/account.service';
import { FormService } from 'src/services/form.service';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {
  @ViewChild('experiencePositionInput', { static: false }) experiencePositionInput!: ElementRef;
  @ViewChild('experienceCompanyInput', { static: false }) experienceCompanyInput!: ElementRef;
  @ViewChild('experienceCountryInput', { static: false }) experienceCountryInput!: ElementRef;
  @ViewChild('experienceSinceInput', { static: false }) experienceSinceInput!: ElementRef;
  @ViewChild('experienceUntilInput', { static: false }) experienceUntilInput!: ElementRef;

  @ViewChild('educationInstitutionInput', { static: false }) educationInstitutionInput!: ElementRef;
  @ViewChild('educationCountryInput', { static: false }) educationCountryInput!: ElementRef;
  @ViewChild('educationCareerInput', { static: false }) educationCareerInput!: ElementRef;
  @ViewChild('educationSinceInput', { static: false }) educationSinceInput!: ElementRef;
  @ViewChild('educationUntilInput', { static: false }) educationUntilInput!: ElementRef;

  @Input()userData: any;

  @Output() onNextStep = new EventEmitter<any>();
  @Output() onPrevStep = new EventEmitter<any>();
  @Output() dataChanged: EventEmitter<any> = new EventEmitter<any>();

  isButtonDisabled: boolean = false;

  options: any;

  counterExperience: number = 1;
  counterEducation: number = 1;

  experiencePosition: string[] = [];
  experienceCompany: string[] = [];
  experienceCountry: string[] = [];
  experienceSince: string[] = [];
  experienceUntil: string[] = [];

  educationInstitution: string[] = [];
  educationCountry: string[] = [];
  educationCareer: string[] = [];
  educationSince: string[] = [];
  educationUntil: string[] = [];

  experienceData: any = {
    position: [],
    company: [],
    country: [],
    since: [],
    until: []
  };

  educationData: any = {
    institution: [],
    country: [],
    career: [],
    since: [],
    until: []
  }
  
  companyList: any;
  institutionList: any;

  constructor(
    private route: Router,
    private form: FormService,
    private account: AccountService,
  ) { }

  async ngOnInit() {
    try {
      this.options = await this.form.step3();
      this.companyList = this.options.listCompany;
      this.institutionList = this.options.listInstitution;
      if(this.userData.data.experience) {
        this.counterExperience = this.userData.data.experience.length;
        this.experiencePosition = this.userData.data.experience?.map((item: any) => (item.position));
        this.experienceCompany = this.userData.data.experience?.map((item: any) => (item.company));
        this.experienceCountry = this.userData.data.experience?.map((item: any) => (item.country));
        this.experienceSince = this.userData.data.experience?.map((item: any) => (item.since));
        this.experienceUntil = this.userData.data.experience?.map((item: any) => (item.until));
      }
      if (this.userData.data.education) {
        this.counterEducation = this.userData.data.education.length;
        this.educationInstitution = this.userData.data.education?.map((item: any) => (item.institution));
        this.educationCountry = this.userData.data.education?.map((item: any) => (item.country));
        this.educationCareer = this.userData.data.education?.map((item: any) => (item.career));
        this.educationSince = this.userData.data.education?.map((item: any) => (item.since));
        this.educationUntil = this.userData.data.education?.map((item: any) => (item.until));
      }
    } catch (error) {
      console.error(error);
    }
  }

  addExperienceCompanyData(e: any, i: number): void { 
    this.experienceCompany[i] = e.target.value;
    this.setData();
  }

  addExperiencePositionData(e: any, i: number): void {
    this.experiencePosition[i] = e.target.value;
    this.setData();
  }

  addExperienceCountryData(e: any, i: number): void {
    this.experienceCountry[i] = e.target.value;
    this.setData();
  }

  addExperienceSinceData(e: any, i: number): void {
    this.experienceSince[i] = e.target.value;
    this.setData();
  }

  addExperienceUntilData(e: any, i: number): void {
    this.experienceUntil[i] = e.target.value;
    this.setData();
  }

  addEducationInstitutionData(e: any, i: number): void {
    this.educationInstitution[i] =  e.target.value;
    this.setData();
  }

  addEducationCareerData(e: any, i: number): void {
    this.educationCareer[i] = e.target.value;
    this.setData();
  }

  addEducationCountryData(e: any, i: number): void {
    this.educationCountry[i] = e.target.value;
    this.setData();
  }

  addEducationSinceData(e: any, i: number): void {
    this.educationSince[i] = e.target.value;
    this.setData();
  }

  addEducationUntilData(e: any, i: number): void {
    this.educationUntil[i] = e.target.value;
    this.setData();
  }

  addExperience(): void {
    this.counterExperience += 1;
    this.userData.data.experience = this.userData.data.experience || [];
    this.userData.data.experience = this.userData.data.experience.concat(Array(this.counterExperience - this.userData.data.experience.length).fill(this.experienceData));
    this.experiencePosition = this.experiencePosition.concat(Array(this.counterExperience - this.experiencePosition.length).fill(''));
    this.experienceCompany = this.experienceCompany.concat(Array(this.counterExperience - this.experienceCompany.length).fill(''));
    this.experienceCountry = this.experienceCountry.concat(Array(this.counterExperience - this.experienceCountry.length).fill(''));
    this.experienceSince = this.experienceSince.concat(Array(this.counterExperience - this.experienceSince.length).fill(''));
    this.experienceUntil = this.experienceUntil.concat(Array(this.counterExperience - this.experienceUntil.length).fill(''));
    this.setData();
  }

  addEducation(): void {
    this.counterEducation += 1;
    this.userData.data.education = this.userData.data.education || [];
    this.userData.data.education = this.userData.data.education.concat(Array(this.counterEducation - this.userData.data.education.length).fill(this.educationData));
    this.educationInstitution = this.educationInstitution.concat(Array(this.counterEducation - this.educationInstitution.length).fill(''));
    this.educationCountry = this.educationCountry.concat(Array(this.counterEducation - this.educationCountry.length).fill(''));
    this.educationCareer = this.educationCareer.concat(Array(this.counterEducation - this.educationCareer.length).fill(''));
    this.educationSince = this.educationSince.concat(Array(this.counterEducation - this.educationSince.length).fill(''));
    this.educationUntil = this.educationUntil.concat(Array(this.counterEducation - this.educationUntil.length).fill(''));
    this.setData();
  }

  setData(): void {
    for(let i = 0; i <= this.counterExperience-1; i++) {
      this.userData.data.experience[i] = {
        company: this.experienceCompany[i],
        position: this.experiencePosition[i],
        country: this.experienceCountry[i],
        since: this.experienceSince[i],
        until: this.experienceUntil[i],
      }
    };
    
    for(let i = 0; i <= this.counterEducation-1; i++) {
      this.userData.data.education[i] = {
        institution: this.educationInstitution[i],
        country: this.educationCountry[i],
        career: this.educationCareer[i],
        since: this.educationSince[i],
        until: this.educationUntil[i],
      }
    };
    this.dataChanged.emit(this.userData);
  }

  async update() {
    this.isButtonDisabled = true;
    await this.account.update(this.userData, null);
    this.isButtonDisabled = false;
    this.route.navigate(['/expert/profile'])
  }

  async prevStep() {
    this.isButtonDisabled = true;
    await this.account.update(this.userData, null);
    this.isButtonDisabled = false;
    this.onPrevStep.emit();
  }

  async nextStep() {
    this.isButtonDisabled = true;
    const response: any = await this.account.update(this.userData, null);
    this.isButtonDisabled = false;
    this.onNextStep.emit(response.message);
  }

}
