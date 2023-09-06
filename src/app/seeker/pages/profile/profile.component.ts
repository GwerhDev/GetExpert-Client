import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Router, ActivatedRoute  } from '@angular/router';
import { AdminService } from 'src/services/admin.service';
import { ExpertService } from 'src/services/expert.service';
import { FormService } from 'src/services/form.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  contactModal: boolean = false;
  showAdminButtons: boolean = false;
  isApproved: boolean = false;

  expertData: any;
  dataExpert: any;
  id: string = "";
  username: string = "";
  profilePic: string = "";
  media: string[] = [];
  profession: any;
  education: any;
  experience: any;
  expertise: any;
  evidence: any;
  network: any;
  status: string = "";
  accountData: any;
  institutionArray: any;
  companyArray: any;
  mediaArray: any;
  professionArray: any;

  constructor( 
    private router: Router,
    private expert: ExpertService,
    private route: ActivatedRoute,
    private admin: AdminService,
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
      this.professionArray = await this.form.formList('profession');
      this.professionArray = this.professionArray.listProfession;

      this.accountData = localStorage.getItem('account');

      if(this.accountData) {
        this.accountData = JSON.parse(this.accountData).data;
        this.route.params.subscribe(async (params) => {
          this.id = params['id'];
          this.expertData = await this.expert.getById(this.id);
          if (!this.expertData) {
            this.router.navigate(['/']);
            return;
          }
          this.username = this.expertData?.username;
          this.profession = this.expertData?.profession;
          this.profilePic = this.expertData?.profilePic;
          this.media = this.expertData?.media;
          if(this.expertData?.education) this.education = this.expertData.education;
          if(this.expertData?.experience) this.experience = this.expertData.experience;
          if(this.expertData?.evidence) this.evidence = this.expertData.evidence;
          if(this.expertData?.network) this.network = this.expertData.network[0];
          if(this.expertData?.expertise) this.expertise = this.expertData.expertise[0];
          this.status = this.expertData?.status;
          if(this.status === 'active'){
            this.isApproved = true;
          } if (this.accountData.status === 'superAdmin' && this.status === 'waitingApprove'){
            this.showAdminButtons = true;
          } if (this.accountData.status !== 'superAdmin' && this.status === 'waitingApprove'){
            this.router.navigate(['/']);
            return;
          }
        return;
        });
      } else {
        this.router.navigate(['/']);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async publishExpert() {
    await this.admin.approveExpert(this.id)
    this.showAdminButtons = false;
  }

  async rejectExpert() {
    await this.admin.rejectExpert(this.id)
    this.showAdminButtons = false;
    this.router.navigate(['/admin'])
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


  goBack() {
    this.router.navigate(['../'])
  }

  contact() {
/*  this.contactModal = true;  */    
    this.dataExpert = this.expertData;
    this.router.navigate([`/contact/${this.id}`])
  }

  AddContact() {
    this.router.navigate(['../'])
  }

  SendRequest() {
    this.router.navigate(['../'])
  }

}
