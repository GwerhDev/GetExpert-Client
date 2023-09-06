import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/services/account.service';
import { classname } from 'src/assets/styles/classes';

@Component({
  selector: 'app-expert-personal-info',
  templateUrl: './expert-personal-info.component.html',
  styleUrls: ['./expert-personal-info.component.scss']
})
export class ExpertPersonalInfoComponent implements OnInit {
  @ViewChild('usernameEdit', { static: false }) usernameEdit!: ElementRef;
  @ViewChild('phoneEdit', { static: false }) phoneEdit!: ElementRef;

  constructor(
    private router: Router,
    private account: AccountService
  ) { }
  
  userData: any;
  
  editionActive: boolean = false;
  showResetInputs: boolean = false;
  isButtonDisabled: boolean = true;

  email: string = '';
  phone: string = '';
  username: string = '';
  profilePic: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  message: string = 'asd';
  showMessage: boolean = false;
  color: string = classname.textError;

  ngOnInit(): void {
    const storedData = localStorage.getItem('account');
    if (storedData) {
      this.userData = JSON.parse(storedData);
      this.username = this.userData.data.username;
      this.email = this.userData.data.email;
      this.phone = this.userData.data.phone;
      this.profilePic = this.userData.data.profilePic;
    }
  }
  
  editInfo(): void {
    this.editionActive = true;
  }

  handlePicFileInput(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const pic = e.target.result;
      const imageSrc = pic;
      this.profilePic = imageSrc;
    };

    reader.readAsDataURL(file);
  }

  async save() {
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

  editCancel(): void {
    this.profilePic = this.userData.data.profilePic;
    this.usernameEdit.nativeElement.value = this.userData.data.username;
    this.phoneEdit.nativeElement.value = this.userData.data.phone;
    this.editionActive = false;
  }

  openPasswordReset(): void {
    this.showResetInputs = true;
  }

  cancelPasswordReset(): void {
    this.showResetInputs = false;
  }

  currentPasswordHandle(e: any): void {
    this.currentPassword = e.target.value;
    if(this.currentPassword && this.newPassword) {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;
    }
  }
  
  newPasswordHandle(e: any): void {
    this.newPassword = e.target.value;
    if(this.currentPassword?.length && this.newPassword?.length) {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;
    }
  }

  async passwordUpdate() {
    const body = {
      _id: this.userData.data._id, 
      currentPassword: this.currentPassword, 
      newPassword: this.newPassword
    }

    const response: any = await this.account.passwordUpdate(body);
    if (response?.error) {
      this.color = classname.textError;
      this.message = response.error;
      this.showMessage = true;
    } else {
      this.color = classname.textPrimary;
      this.message = response.message;
      this.showMessage = true;
      this.closePasswordReset();
      setTimeout(() => {
        this.showMessage = false;
      }, 3000);
      return;
    }
  }

  closePasswordReset(): void {
    this.showResetInputs = false;
    this.currentPassword = '';
    this.newPassword = '';
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
