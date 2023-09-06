import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AccountService } from 'src/services/account.service';
import { FormService } from 'src/services/form.service';

@Component({
  selector: 'app-expert-info',
  templateUrl: './expert-info.component.html',
  styleUrls: ['./expert-info.component.scss']
})
export class ExpertInfoComponent implements OnInit {
  @ViewChild('usernameEdit', { static: false }) usernameEdit!: ElementRef;
  @ViewChild('aboutEdit', { static: false }) aboutEdit!: ElementRef;
  @ViewChild('bioEdit', { static: false }) bioEdit!: ElementRef;
  @ViewChild('evidenceTitleEdit', { static: false }) evidenceTitleEdit!: ElementRef;
  @ViewChild('evidenceDescriptionEdit', { static: false }) evidenceDescriptionEdit!: ElementRef;

  showAlert: boolean = false;
  previewActive: boolean = false;
  showEditButtons: boolean = false;
  editionBioActive: boolean = false;
  editionInfoActive: boolean = false;
  editionAboutActive: boolean = false;
  editionEvidenceActive: boolean = false;
  editionEducationActive: boolean = false;
  
  alertRoute: string = '';
  alertMessage: string = '';
  alertTextRouter: string = '';

  editBioText: string = '';
  editAboutText: string = '';
  editUsernameText: string = '';
  editEvidenceTitle: string = '';
  editEvidencePhoto: string = '';
  editEvidenceDescription: string = '';

  institutionList: any;
  mediaList: any;

  userData: any;

  bio: string = '';
  area: any;
  name: string = '';
  email: string = '';
  username: string = '';
  profilePic: string = '';
  evidencePhoto: string = '';

  media: any;
  evidence: any;
  education: any;
  expertise: any;
  experience: any;
  institution: any;
  network: any;

  areaArray: any;
  mediaArray: any;
  companyArray: any;
  institutionArray: any;
  
  constructor(
    private account: AccountService,
    private form: FormService,
  ) { }

  async ngOnInit() {
    try {
      this.institutionArray = await this.form.formList('institution');
      this.institutionArray = this.institutionArray.listInstitution;
      this.mediaArray = await this.form.formList('media');
      this.mediaArray = this.mediaArray.listMedia;
      this.companyArray = await this.form.formList('company');
      this.companyArray = this.companyArray.listCompany;
      this.areaArray = await this.form.formList('area');
      this.areaArray = this.areaArray.listArea;

      const storedData = localStorage.getItem('account');
      if (storedData) {
        this.userData = JSON.parse(storedData);
        this.username = this.userData.data.username;
        this.email = this.userData.data.email;
        this.profilePic = this.userData.data.profilePic;
        this.institution = this.userData.data.institution;
        this.media = this.userData.data.media;
        
        if (this.userData.data.evidence) {
          this.evidence = this.userData.data.evidence;
        }
        if (this.userData.data.education) {
          this.education = this.userData.data.education;
        }
        if (this.userData.data.expertise) {
          this.expertise = this.userData.data.expertise;
          this.area = this.userData.data.expertise[0].area;
          this.name = this.userData.data.expertise[0].name;
          this.bio = this.userData.data.expertise[0].bio;
        }
        if (this.userData.data.experience) {
          this.experience = this.userData.data.experience;
        }
        if (this.userData.data.network) {
          this.network = this.userData.data.network[0];
        }
      }
      if (this.userData.data.status === 'active' || this.userData.data.status === 'superAdmin') {
        this.showEditButtons = true;
        this.showAlert = false;
      } else if (this.userData.data.status === 'waitingApprove' ) {
        this.showEditButtons = true;
        this.alertMessage = 'Perfil en proceso de validación';
        this.alertRoute = '/expert/register-success';
        this.alertTextRouter = 'Saber más';
        this.showAlert = true;
      } else if (this.userData.data.status === 'inactive') {
        this.alertMessage = 'Perfil inactivo. Debes completar el formulario de registro';
        this.alertRoute = '/expert/register-info';
        this.alertTextRouter = 'Completar formulario';
        this.showAlert = true;
      }
    } catch (error) {

    }
  }

  handlePicFileInput(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const pic = e.target.result;
      const imageSrc = pic;
      this.profilePic = imageSrc;
    };

    reader.readAsDataURL(file);
  }

  handleEvidenceFileInput(event: any, i: number) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const pic = e.target.result;
      const imageSrc = pic;
      this.evidence[i].photo = imageSrc;
    };

    reader.readAsDataURL(file);
  }

  editEducation() {
    this.editionEducationActive = true;
  }

  editEvidence() {
    this.editEvidencePhoto = this.evidencePhoto;
    this.editEvidenceTitle = this.evidence[0].title;
    this.editEvidenceDescription = this.evidence[0].description;
    this.editionEvidenceActive = true;
  }

  async updateEvidence() {
    this.userData.data.evidence[0].photo = this.evidencePhoto;
    this.userData.data.evidence[0].title = this.evidenceTitleEdit.nativeElement.value;
    this.userData.data.evidence[0].description = this.evidenceDescriptionEdit.nativeElement.value;
    await this.account.update(this.userData, null);
    this.editionEvidenceActive = false;
  }

  cancelEditEvidence() {
    this.evidencePhoto = this.evidence[0].photo;
    this.editionEvidenceActive = false;
  }

  editAbout() {
    this.editionAboutActive = true;
    this.editAboutText = this.userData.data.expertise[0].name;
  }

  cancelEditAbout() {
    this.editionAboutActive = false;
  }

  async updateAbout() {
    this.userData.data.expertise[0].name = this.aboutEdit.nativeElement.value;
    await this.account.update(this.userData, null);
    this.editionAboutActive = false;
  }

  editBio() {
    this.editionBioActive = true;
    this.editBioText = this.userData.data.expertise[0].bio;
  }

  cancelEditBio() {
    this.editionBioActive = false;
  }

  async updateBio() {
    this.userData.data.expertise[0].bio = this.bioEdit.nativeElement.value;
    await this.account.update(this.userData, null);
    this.editionBioActive = false;
  }

  showPreview() {
    this.previewActive = true;
  }

  dismiss() {
    this.showAlert = false;
  }

  async editInfo() {
    this.editionInfoActive = true;
    this.editUsernameText = this.userData.data.username;
    let list = await this.form.step1();
    this.institutionList = list.listInstitution;
    this.mediaList = list.listMedia;
  }

  cancelEditInfo() {
    this.editionInfoActive = false;
    this.username = this.userData.data.username;
    this.profilePic = this.userData.data.profilePic;
  }

  async updateInfo() {
    this.userData.data.username = this.usernameEdit.nativeElement.value;
    this.userData.data.profilePic = this.profilePic;
    await this.account.update(this.userData, null);
    this.username = this.userData.data.username;
    this.editionInfoActive = false;
  }

  setNum(num: number) {
    localStorage.setItem('numb', num.toString());
  }

  getNameById(id: any, array: any) {
    let idArray: any[] = [];
    array.filter((item: any) => { 
      for(let i of id) {
        if(i == item._id) {
          idArray.push(item.name)
        }
      }
     }
    )
    return idArray
  }
}
