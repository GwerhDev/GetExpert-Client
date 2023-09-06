import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {
  id: string = '';
  token: string = '';
  message: string = '';
  typeInput: string = 'password';
  newPassword: string = '';
  newPasswordRepeat: string = '';
  isDisabled: boolean = true;
  showMessage: boolean = false;

  constructor(
    private account: AccountService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.token = params['token'];
    });

    localStorage.setItem('token', this.token)
  }

  inputPassword(e: any) {
    this.newPassword = e.target.value;
  }

  inputPasswordRepeat(e: any) {
    this.newPasswordRepeat = e.target.value;
  }

  inputsChange() {
    if(this.newPassword !== this.newPasswordRepeat) {
      this.isDisabled = true;
      return;
    } else {
      this.isDisabled = false;
    }
  }

  resetStorage() {
    localStorage.removeItem('token');
  }

  cancel() {
    this.resetStorage();
    this.router.navigate(['/'])
  }

  async passwordReset() {
    const body = { id: this.id, newPassword: this.newPassword };
    const response: any = await this.account.passwordReset(body);
    if(response?.message) {
      setTimeout(() => {
        this.message = 'Contraseña actualizada correctamente. Serás redirigido en breves momentos.';
        this.showMessage = true;
      }, 250);
      this.router.navigate(['/login']);
      this.resetStorage();
      return;
    } else {
      setTimeout(() => {
        this.message = 'Ha ocurrido un error. Por favor, inténtelo de nuevo.';
        this.showMessage = true;
      }, 250);
      this.showMessage = false;
      return;
    }
  }
}
