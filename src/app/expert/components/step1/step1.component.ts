import { Component, ElementRef, EventEmitter, OnInit, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/services/account.service';
import { FormService } from 'src/services/form.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {
  @ViewChild('nameInput', { static: false }) nameInput!: ElementRef;
  @ViewChild('professionInput', { static: false }) professionInput!: ElementRef;
  @ViewChild('institutionInput', { static: false }) institutionInput!: ElementRef;
  @ViewChild('mediaInput', { static: false }) mediaInput!: ElementRef;
  @ViewChild('filterInput', { static: false }) filterInput!: ElementRef;

  @Input() userData: any;

  @Output() onNextStep = new EventEmitter<any>();
  @Output() dataChanged: EventEmitter<any> = new EventEmitter<any>();
  
  isButtonDisabled: boolean = false;

  username: string = '';
  profilePic: string = '';

  media: any[] = [];
  profession: any[] = [];
  institution: any[] = [];
  
  idMedia: any[] = [];
  idProfession: any[] = [];
  idInstitution: any[] = [];

  options: any;
  mediaOptions: any;
  professionOptions: any;
  institutionOptions: any;

  constructor(
    private account: AccountService,
    private form: FormService,
    private route: Router,
  ) { }
  
  async ngOnInit() {  
    try {
      this.options = await this.form.step1();
      this.mediaOptions = this.options.listMedia;
      this.professionOptions = this.options.listProfession;
      this.institutionOptions = this.options.listInstitution;
      this.username = this.userData.data.username;
      this.profilePic = this.userData.data.profilePic;
      this.idMedia = this.userData.data.media?.map((item: any) => item._id);
      this.idProfession = this.userData.data.profession?.map((item: any) => item._id);
      this.idInstitution = this.userData.data.institution?.map((item: any) => item._id);
      this.media = this.userData.data.media;  
      this.profession = this.userData.data.profession;
      this.institution = this.userData.data.institution;

    } catch (error) {
      console.error(error);
    }
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e: any) => {
      const pic = e.target.result;
      const imageSrc = pic;
      this.profilePic = imageSrc;
    };
  
    reader.readAsDataURL(file);
    this.setData();
  }

  addProfession(): void {
    let idValue = this.professionInput.nativeElement.value;
    let value = this.professionOptions.filter((item: any) => item._id === idValue)[0];

    if (!this.profession?.length) {
      this.profession = [value];
      this.idProfession = [idValue];
    } else if (this.idProfession?.length && !this.idProfession?.includes(idValue)) {
      this.profession = [...this.profession, value];
      this.idProfession = [...this.idProfession, idValue];
    }
    this.setData();
  }

  addInstitution(): void {
    let idValue = this.institutionInput.nativeElement.value;
    let value = this.institutionOptions.filter((item: any) => item._id === idValue)[0];

    if (!this.institution?.length) {
      this.institution = [value];
      this.idInstitution = [idValue];
    } else if (this.idInstitution?.length && !this.idInstitution?.includes(idValue)) {
      this.institution = [...this.institution, value];
      this.idInstitution = [...this.idInstitution, idValue];
    }
    this.setData();
  }

  addMedia(): void {
    let idValue = this.mediaInput.nativeElement.value;
    let value = this.mediaOptions.filter((item: any) => item._id === idValue)[0];

    if (!this.media?.length) {
      this.media = [value];
      this.idMedia = [idValue];
      this.setData();
    } else if (this.idMedia?.length && !this.idMedia?.includes(idValue)) {
      this.media = [...this.media, value];
      this.idMedia = [...this.idMedia, idValue];
      this.setData();
    }  
  }

  setData(): void {
    this.userData.data.media = this.media;
    this.userData.data.username = this.username;
    this.userData.data.profilePic = this.profilePic;
    this.userData.data.profession = this.profession;
    this.userData.data.institution = this.institution;
    this.dataChanged.emit(this.userData);
  }

  async update() {
    this.isButtonDisabled = true;
    await this.account.update(this.userData, null);
    this.isButtonDisabled = false;
    this.route.navigate(['/expert/profile'])
  }

  async nextStep() {
    this.isButtonDisabled = true;
    const response: any = await this.account.update(this.userData, null);
    this.isButtonDisabled = false;
    this.onNextStep.emit(response.message);
  }

  dismiss(index: number, array: string) {
    if (array === 'profession') {
      this.profession.splice(index, 1);
      this.idProfession.splice(index, 1);
    } else if (array === 'institution') {
      this.institution.splice(index, 1);
      this.idInstitution.splice(index, 1);
    } else if (array === 'media') {
      this.media.splice(index, 1);
      this.idMedia.splice(index, 1);
    }
  }
}
