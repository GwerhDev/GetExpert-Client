import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-modal-login-user',
  templateUrl: './modal-login-user.component.html',
  styleUrls: ['./modal-login-user.component.scss']
})
export class ModalLoginUserComponent implements OnInit {
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
    const email = (document.getElementById('login-modal-email') as HTMLInputElement).value;
    const password = (document.getElementById('login-modal-password') as HTMLInputElement).value;
    const response = await this.auth.innerLogIn(email, password)
    if (response?.error) {
      this.showMessage = true;
      this.message = response.error;
    }
  } 
  
  validateFields(): void {
    const email = (<HTMLInputElement>document.getElementById('login-modal-email')).value;
    const password = (<HTMLInputElement>document.getElementById('login-modal-password')).value;
    if (email && password) {
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
