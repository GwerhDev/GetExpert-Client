import { Component, ElementRef, EventEmitter, OnInit, Output, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/services/account.service';
import { AuthService } from 'src/services/auth.service';
import { FormService } from 'src/services/form.service';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss']
})
export class Step4Component implements OnInit {
  @ViewChild('emailInput', { static: false }) emailInput!: ElementRef;
  @ViewChild('phoneInput', { static: false }) phoneInput!: ElementRef;
  @ViewChild('regionInput', { static: false }) regionInput!: ElementRef;
  @ViewChild('communeInput', { static: false }) communeInput!: ElementRef;

  @ViewChild('networkLinkedInInput', { static: false }) networkLinkedInInput!: ElementRef;
  @ViewChild('networkTwitterInput', { static: false }) networkTwitterInput!: ElementRef;
  @ViewChild('networkInstagramInput', { static: false }) networkInstagramInput!: ElementRef;
  @ViewChild('networkMediumInput', { static: false }) networkMediumInput!: ElementRef;
  
  @Input() userData: any;

  @Output() onNextStep = new EventEmitter<any>();
  @Output() onPrevStep = new EventEmitter<any>();
  @Output() dataChanged: EventEmitter<any> = new EventEmitter<any>();

  isDisabled: boolean = true;
  isButtonDisabled: boolean = false;

  email: string = '';
  phone: string = '';

  region: any;
  commune: any;

  networkMedium: string = '';
  networkTwitter: string = '';
  networkLinkedIn: string = '';
  networkInstagram: string = '';

  options: any;
  regionOptions: any;
  communeOptions: any;
  
  idRegion: any;
  idCommune: any;

  constructor(
    private account: AccountService,
    private form: FormService,
    private route: Router,
  ) { }

  async ngOnInit(){
    try {
      this.options = await this.form.step4();
      this.regionOptions = this.options.listRegion;
      this.email = this.userData.data.email;
      this.phone = this.userData.data.phone;
      if(this.userData.data.region.length) {
        this.region = this.userData.data.region;
        this.idRegion = this.region.map((e: any) => e._id);
        if(this.region) {
          let idArray = this.options.listRegion.filter((item: any) => item._id === this.idRegion[0])[0]?.commune;
          this.communeOptions = this.options.listCommune.filter((item: any) => idArray?.includes(item._id));
          if(this.userData.data.commune) {
            this.commune = this.userData.data.commune;
            this.idCommune = this.commune.map((e: any) => e._id);
          }
        }
        
        if(this.userData.data.network?.length) {
          this.networkMedium = this.userData.data.network[0].medium;
          this.networkTwitter = this.userData.data.network[0].twitter;
          this.networkLinkedIn = this.userData.data.network[0].linkedin;
          this.networkInstagram = this.userData.data.network[0].instagram;
        } else if(!this.userData.data.network) {
          this.userData.data.network = [{
            medium: this.networkMediumInput.nativeElement.value,
            twitter: this.networkTwitterInput.nativeElement.value,
            linkedin: this.networkLinkedInInput.nativeElement.value,
            instagram: this.networkInstagramInput.nativeElement.value,
          }]
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  onChange(): void {
    this.phone = this.phoneInput.nativeElement.value;
    this.networkMedium = this.networkMediumInput.nativeElement.value;
    this.networkTwitter = this.networkTwitterInput.nativeElement.value;
    this.networkLinkedIn = this.networkLinkedInInput.nativeElement.value;
    this.networkInstagram = this.networkInstagramInput.nativeElement.value;
    this.setData();
  }

  regionSelected(): void {
    this.idRegion = this.regionInput.nativeElement.value;
    this.region = this.options.listRegion.filter((item: any) => item._id === this.idRegion);
    if(this.region) {
      let idArray = this.region[0].commune;
      this.communeOptions = this.options.listCommune.filter((item: any) => idArray.includes(item._id));
    }
    this.setData();
  }

  communeSelected(): void {
    let idValue = this.communeInput.nativeElement.value;
    this.idCommune = idValue;
    this.commune = this.communeOptions.filter((item: any) => item._id === this.idCommune);
    this.setData();
  }

  setData(): void {
    this.userData.data.phone = this.phone;
    if(this.userData.data.region) {
      this.userData.data.region = this.region?? null;
    } else if(!this.userData.data.region && this.region) {
      this.userData.data.region = [this.region]?? null;
    }
    
    if(this.userData.data.commune) {
      this.userData.data.commune = this.commune?? null;
    } else if(!this.userData.data.commune && this.commune) {
      this.userData.data.commune = [this.commune]?? null;
    }

    if(this.userData.data.network){
      this.userData.data.network[0].medium = this.networkMedium;
      this.userData.data.network[0].twitter = this.networkTwitter;
      this.userData.data.network[0].linkedin = this.networkLinkedIn;
      this.userData.data.network[0].instagram = this.networkInstagram;
    } else {
      this.userData.data.network = [{
        medium: this.networkMedium,
        twitter: this.networkTwitter,
        linkedin: this.networkLinkedIn,
        instagram: this.networkInstagram,
      }]
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
    const response: any = await this.account.update(this.userData, null);
    this.isButtonDisabled = false;
    this.onNextStep.emit(response.message);
  }
}
