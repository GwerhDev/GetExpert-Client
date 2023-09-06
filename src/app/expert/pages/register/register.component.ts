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
  
  userData: any = {};
  usermail: string = '';
  
  showCardBody: boolean = true;
  showMessage: boolean = false;
  message: string = '';

  isButtonDisabled: boolean = true;
  toggleLoginModal: boolean = false;

  validateFields(): void {
    const username = (<HTMLInputElement>document.getElementById('register-expert-name')).value;
    const email = (<HTMLInputElement>document.getElementById('register-expert-email')).value;
    const phone = (<HTMLInputElement>document.getElementById('register-expert-phone')).value;
    const password = (<HTMLInputElement>document.getElementById('register-expert-password')).value;
    if (username && email?.includes('@') && phone && phone.length === 9 && !isNaN(Number(phone)) && password) {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;
    }
  }

  ngOnInit(): void {
    const storedData = localStorage.getItem('userToken');
    if (storedData) {
      this.userData = JSON.parse(storedData);
      if (this.userData.data.error) {
        this.showMessage = true;
        this.message = this.userData.data.msg;
      }
    }
  }
  
  async innerSignUp() {
    const name = (document.getElementById('register-expert-name') as HTMLInputElement).value;
    const email = (document.getElementById('register-expert-email') as HTMLInputElement).value;
    const phone = (document.getElementById('register-expert-phone') as HTMLInputElement).value;
    const password = (document.getElementById('register-expert-password') as HTMLInputElement).value;
    localStorage.removeItem('signup');
    localStorage.removeItem('userToken');
    localStorage.removeItem('decodedToken');
    try {
      await this.auth.innerSignUp(name, email, phone, password, 'expert')
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
    this.auth.googleAuth('expert', 'signup')
  }

  linkedinSignUp() {
    localStorage.removeItem('signup');
    localStorage.removeItem('userToken');
    localStorage.removeItem('decodedToken');
    this.auth.linkedinAuth('expert', 'signup')
  }

  enabledState() {

  }
}
