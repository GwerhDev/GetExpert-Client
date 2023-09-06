import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  constructor(
    private auth: AuthService,
  ) { }

  showCardBody: boolean = true;
  showMessage: boolean = false;
  message: string = '';
  toggleLoginModal: boolean = false;
  registerSuccess: boolean = false;
  redirectionRoute: string = '/expert/profile';
  isButtonDisabled = true;
  usermail: string = '';
  userData: any = {};
  username: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';

  validateFields(): void {
    this.username = (<HTMLInputElement>document.getElementById('signup-user-name')).value;
    this.email = (<HTMLInputElement>document.getElementById('signup-user-email')).value;
    this.phone = (<HTMLInputElement>document.getElementById('signup-user-phone')).value;
    this.password = (<HTMLInputElement>document.getElementById('signup-user-password')).value;
     if (this.username && this.email?.includes('@') && this.phone && this.phone.length === 9 && !isNaN(Number(this.phone)) && this.password) {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;
    }
  }

  ngOnInit(): void {
    const storedData = localStorage.getItem('userToken');
    if (storedData) {
      this.userData = JSON.parse(storedData);
      if (this.userData.data.status === 'active') {
        this.registerSuccess = true;
        this.redirectionRoute = '/user/profile';
      } else if (this.userData.data.error) {
        this.showMessage = true;
        this.message = this.userData.data.msg;
      }
    }
  }
  
  async innerSignUp() {
    this.username = (document.getElementById('signup-user-name') as HTMLInputElement).value;
    this.email = (document.getElementById('signup-user-email') as HTMLInputElement).value;
    this.phone = (document.getElementById('signup-user-phone') as HTMLInputElement).value;
    this.password = (document.getElementById('signup-user-password') as HTMLInputElement).value;
    localStorage.removeItem('signup');
    localStorage.removeItem('userToken');
    localStorage.removeItem('decodedToken');
    try {
      await this.auth.innerSignUp(this.username, this.email, this.phone, this.password, 'user')
      const storedData = localStorage.getItem('signup');
      if (storedData) {
        this.userData = JSON.parse(storedData);
        if (this.userData.errorToken?.error) {
          this.showMessage = true;
          this.message = this.userData.errorToken.msg;
          return;
        } else if (this.userData.msg) {
          this.showCardBody = false;
          return;
        }
      } 
    } catch (error) {
      console.error(error);
    }
  }

  googleSignUp() {
    localStorage.removeItem('signup');
    localStorage.removeItem('userToken');
    localStorage.removeItem('decodedToken');
    this.auth.googleAuth('user', 'signup')
  }

  linkedinSignUp() {
    localStorage.removeItem('signup');
    localStorage.removeItem('userToken');
    localStorage.removeItem('decodedToken');
    this.auth.linkedinAuth('user', 'signup')
  }

  enabledState() {

  }
}
