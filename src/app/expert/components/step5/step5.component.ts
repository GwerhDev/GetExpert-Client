import { Component, EventEmitter, OnInit, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { AccountService } from 'src/services/account.service';
import { AuthService } from 'src/services/auth.service';
import { FormsValidations } from 'src/validations/expert-form';
import { FormService } from 'src/services/form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.scss']
})
export class Step5Component implements OnInit {
  @ViewChild('evidenceTypeInput', { static: false }) evidenceTypeInput!: ElementRef;
  @ViewChild('evidenceMediaInput', { static: false }) evidenceMediaInput!: ElementRef;
  @ViewChild('evidenceTitleInput', { static: false }) evidenceTitleInput!: ElementRef;
  @ViewChild('evidenceDescriptionInput', { static: false }) evidenceDescriptionInput!: ElementRef;
  @ViewChild('evidenceUrlInput', { static: false }) evidenceUrlInput!: ElementRef;
  
  @Input() userData: any = {};

  @Output() onNextStep = new EventEmitter<any>();
  @Output() onPrevStep = new EventEmitter<any>();
  @Output() dataChanged: EventEmitter<any> = new EventEmitter<any>();

  formValidation: any = false;
  isButtonDisabled: boolean = false;
  counterEvidence: number = 1;

  evidence: string[] = [];
  evidencePhoto: string[] = [];
  evidenceType: string[] = [];
  evidenceMedia: string[] = [];
  evidenceTitle: string[] = [];
  evidenceDescription: string[] = [];
  evidenceUrl: string[] = [];

  options: any;
  mediaOptions: any;
  evidenceOptions: any;

  evidenceData: any = {
    photo: [],
    type: [],
    media: [],
    title: [],
    description: [],
    url: [],
  };

  constructor(
    private account: AccountService,
    private route: Router,
    private form: FormService,
    private validation: FormsValidations,
  ) { }

  async ngOnInit() {
    try {
      this.options = await this.form.step5();
      this.mediaOptions = this.options.listMedia;
      this.evidenceOptions = this.options.evidenceList;
      if (this.userData.data.evidence) {
        this.counterEvidence = this.userData.data.evidence?.length;
        this.evidenceUrl = this.userData.data.evidence?.map((item: any) => (item.url));
        this.evidenceType = this.userData.data.evidence?.map((item: any) => (item.type));
        this.evidenceMedia = this.userData.data.evidence?.map((item: any) => (item.media));
        this.evidenceTitle = this.userData.data.evidence?.map((item: any) => (item.title));
        this.evidencePhoto = this.userData.data.evidence?.map((item: any) => (item.photo));
        this.evidenceDescription = this.userData.data.evidence?.map((item: any) => (item.description));
      }
    } catch (error) {
      console.error(error)
    }
  }

  addEvidence(): void {
    this.counterEvidence += 1;
    this.userData.data.evidence = this.userData.data.evidence || [];
    this.userData.data.evidence = this.userData.data.evidence.concat(Array(this.counterEvidence - this.userData.data.evidence.length).fill(this.evidenceData));
    this.evidenceUrl = this.evidenceUrl.concat(Array(this.counterEvidence - this.evidenceUrl.length).fill(''));
    this.evidenceType = this.evidenceType.concat(Array(this.counterEvidence - this.evidenceType.length).fill(''));
    this.evidenceMedia = this.evidenceMedia.concat(Array(this.counterEvidence - this.evidenceMedia.length).fill(''));
    this.evidenceTitle = this.evidenceTitle.concat(Array(this.counterEvidence - this.evidenceTitle.length).fill(''));
    this.evidencePhoto = this.evidencePhoto.concat(Array(this.counterEvidence - this.evidencePhoto.length).fill(''));
    this.evidenceDescription = this.evidenceDescription.concat(Array(this.counterEvidence - this.evidenceDescription.length).fill(''));
    this.setData();
  }

  handleFileInput(event: any, i: number) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (e: any) => {
      const pic = e.target.result;
      const imageSrc = pic;
      this.evidencePhoto[i] = imageSrc;
    };
    
    reader.readAsDataURL(file);
    this.setData();
  }

  addEvidenceTypeData(e: any, i: number) {
    this.evidenceType[i] = e.target.value;
    this.setData();
  }

  addEvidenceMediaData(e: any, i: number) {
    this.evidenceMedia[i] = e.target.value;
    this.setData();
  }

  addEvidenceTitleData(e: any, i: number) {
    this.evidenceTitle[i] = e.target.value;
    this.setData();
  }

  addEvidenceDescriptionData(e: any, i: number) {
    this.evidenceDescription[i] = e.target.value;
    this.setData();
  }

  addEvidenceUrlData(e: any, i: number) {
    this.evidenceUrl[i] = e.target.value;
    this.setData();
  }

  setData() {
    for(let i = 0; i <= this.counterEvidence-1; i++) {
      this.userData.data.evidence[i].type = this.evidenceType[i];
      this.userData.data.evidence[i].photo = this.evidencePhoto[i];
      this.userData.data.evidence[i].media = this.evidenceMedia[i];
      this.userData.data.evidence[i].title = this.evidenceTitle[i];
      this.userData.data.evidence[i].description = this.evidenceDescription[i];
      this.userData.data.evidence[i].url = this.evidenceUrl[i];
    }
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
    await this.account.update(this.userData, null);
    this.formValidation = this.validation.expertFormValidation(this.userData.data);
    if(this.formValidation) {
      try {
        const response = await this.account.pendingResponse(this.userData.data._id);
        this.onNextStep.emit();
        return;
      } catch (error) {
        console.error(error);
      }
      this.isButtonDisabled = false;
      return;
    }
  }
}
