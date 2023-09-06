import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  @ViewChild('usernameEdit', { static: false }) usernameEdit!: ElementRef;
  @ViewChild('phoneEdit', { static: false }) phoneEdit!: ElementRef;

  constructor(
    private router: Router,
    private account: AccountService
  ) { }
  
  userData: any;
  username: string = '';
  email: string = '';
  phone: string = '';
  profilePic: string = '';
  editionActive: boolean = false;

  ngOnInit(): void {
    try {
      const storedData = localStorage.getItem('account');
      if (storedData) {
        this.userData = JSON.parse(storedData);
        this.username = this.userData.data.username;
        this.email = this.userData.data.email;
        this.phone = this.userData.data.phone;
        this.profilePic = this.userData.data.profilePic;
      }      
    } catch (error) {
      
    }
  
  }
  
  editInfo(){
    this.editionActive = true;
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

  async save(){
    try {
      this.userData.data.profilePic = this.profilePic;
      this.userData.data.username = this.usernameEdit.nativeElement.value;
      this.userData.data.phone = this.phoneEdit.nativeElement.value;
      await this.account.update(this.userData, null);
      this.editionActive = false;
    } catch (error) {
      console.error(error);
    }
  }

  editCancel(){
    this.profilePic = this.userData.data.profilePic;
    this.usernameEdit.nativeElement.value = this.userData.data.username;
    this.phoneEdit.nativeElement.value = this.userData.data.phone;
    this.editionActive = false;
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }
}


