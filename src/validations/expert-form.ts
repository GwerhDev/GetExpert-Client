import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FormsValidations {
  step1: boolean = false;
  step2: boolean = false;
  step3: boolean = false;
  step4: boolean = false;
  step5: boolean = false;

  userModel: boolean = false;
  expertiseModel: boolean = false;
  educationModel: boolean = false;
  experienceModel: boolean = false;
  contactModel: boolean = false;
  networkModel: boolean = false;
  evidenceModel: boolean = false;

  reqUsername: boolean = false;
  reqEmail: boolean = false;
  reqPhone: boolean = false;
  reqMedia: boolean = false;
  reqFormat: boolean = false;
  reqDayDate: boolean = false;
  reqHourDate: boolean = false;
  reqInfo: boolean = false;

  incomplete: string[] = []

  constructor(
  ) {}

  contactFormValidation(data: any) {
    this.incomplete = []

  }

  expertFormValidation(data: any) {
    this.incomplete = []
    if(
      data.username &&
      data.email &&
      data.phone &&
      data.profession &&
      data.institution &&
      data.media
    ) {
      this.userModel = true;
    }
    for(let i in data.expertise) {
      if(
/*         data.expertise[i]?.area &&
 */        //TODO
        data.expertise[i]?.name &&
        data.expertise[i]?.bio
      ) {
        this.expertiseModel = true;
        break;
      }
    }
    for(let i in data.education) {
      if(
        data.education[i]?.career &&
        data.education[i]?.institution &&
        data.education[i]?.country &&
        data.education[i]?.since &&
        data.education[i]?.until
      ) {
      this.educationModel = true;
      break;
      }
    }
    for(let i in data.experience) {
      if(
        data.experience[i]?.position &&
        data.experience[i]?.company &&
        data.experience[i]?.country &&
        data.experience[i]?.since &&
        data.experience[i]?.until
      ) {      
      this.experienceModel = true;
      break;
      }
    }
    for(let i in data) {
      if(
        data.region &&
        data.commune
      ) {      
      this.contactModel = true;
      break;
      }
    }
    for(let i in data.network) {
      if(
        data.network[i]?.linkedin ||
        data.network[i]?.twitter ||
        data.network[i]?.instagram ||
        data.network[i]?.medium
      ) {      
      this.networkModel = true;
      break;
      }
    }
    for(let i in data.evidence) {
      if(
/*         data.evidence[i]?.photo &&
 */ //TODO
        data.evidence[i]?.type &&
        data.evidence[i]?.media &&
        data.evidence[i]?.title &&
        data.evidence[i]?.description &&
        data.evidence[i]?.url
      ) {      
      this.evidenceModel = true;
      break;
      }
    }

    if(this.userModel) this.step1 = true;
    if(this.expertiseModel) this.step2 = true;
    if(this.educationModel && this.experienceModel) this.step3 = true;
    if(this.contactModel && this.networkModel) this.step4 = true;
    if(this.evidenceModel) this.step5 = true;
    
    if(this.step1 && this.step2 && this.step3 && this.step4 && this.step5) {
      return true;
    } else {
      if(!this.step1) {
        this.incomplete.push('Datos faltantes en paso 1');
      }
      if(!this.step2) {
        this.incomplete.push('Datos faltantes en paso 2');
      }
      if(!this.step3) {
        this.incomplete.push('Datos faltantes en paso 3');
      }
      if(!this.step4) {
        this.incomplete.push('Datos faltantes en paso 4');
      }
      if(!this.step5) {
        this.incomplete.push('Datos faltantes en paso 5');
      }
      alert(this.incomplete)
      return false;
    }
  }
}