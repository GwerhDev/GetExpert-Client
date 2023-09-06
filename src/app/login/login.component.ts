import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() onDismiss = new EventEmitter();
  
  toggleRecoveryModal: boolean = false;
  isButtonDisabled: boolean = true;
  showMessage: boolean = false;
  message: string = '';

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
  }

  googleLogIn() {
    this.auth.googleAuth('user', 'login')
  }

  linkedinLogIn() {
    this.auth.linkedinAuth('user', 'login')
  }

  async innerLogIn() {
    const email = (document.getElementById('login-email') as HTMLInputElement).value;
    const password = (document.getElementById('login-password') as HTMLInputElement).value;
    const response = await this.auth.innerLogIn(email, password)
    if (response?.error) {
      this.showMessage = true;
      this.message = response.error;
    }
  } 
  
  validateFields(): void {
    this.message = '';
    this.showMessage = false;
    const email = (<HTMLInputElement>document.getElementById('login-email')).value;
    const password = (<HTMLInputElement>document.getElementById('login-password')).value;
    if (email?.includes('@') && password) {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;
    }
  }

  displayRecovery() {
    this.toggleRecoveryModal = true;
    this.onDismiss.emit();
  }

  dismiss() {
    this.onDismiss.emit();
  }
}

