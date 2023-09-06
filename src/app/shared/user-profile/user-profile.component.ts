import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpertService } from 'src/services/expert.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Input() show: boolean = true;
  @Input() mediaArray: any;
  @Input() companyArray: any;
  @Input() institutionArray: any;

  contactModal: boolean = false;
  showLoader: boolean = true;

  expertData: any;
  username: string = "";
  profilePic: string = "";
  media: string[] = [];
  education: any;
  experience: any;
  expertise: any;
  evidence: any;
  network: any;
  message: string = "Cargando...";

  constructor( 
    private router: Router,
    private expert: ExpertService,
  ) { }

  async ngOnInit() {
    const storedData = localStorage.getItem('account');
    if(storedData) {
      this.expertData = JSON.parse(storedData);
      this.expertData = await this.expert.getById(this.expertData.data._id);
      this.showLoader = false;
      this.username = this.expertData.username;
      this.profilePic = this.expertData.profilePic;
      this.media = this.expertData.media;
      this.education = this.expertData.education;
      this.experience = this.expertData.experience;
      this.evidence = this.expertData.evidence;
      this.network = this.expertData.network[0];
      this.expertise = this.expertData.expertise[0];
    }
  }

  goBack() {
    this.router.navigate(['../'])
  }

  contact() {
    this.contactModal = true;
  }

  AddContact() {
    this.router.navigate(['../'])
  }

  SendRequest() {
    this.router.navigate(['../'])
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
