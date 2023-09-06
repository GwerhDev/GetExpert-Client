import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-modal-password-recovery',
  templateUrl: './modal-password-recovery.component.html',
  styleUrls: ['./modal-password-recovery.component.scss']
})
export class ModalPasswordRecoveryComponent implements OnInit {

  @Input() isOpen: boolean = false;
  @Output() onDismiss = new EventEmitter();
  
  constructor(
    private account: AccountService,
  ) {}

  isButtonDisabled = true;

  ngOnInit(): void {
  }

  validateFields(): void {
    const email = (<HTMLInputElement>document.getElementById('recovery-pass-email')).value;
    if (email) {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;
    }
  }

  async passwordRecovery() {
    const email = (document.getElementById('recovery-pass-email') as HTMLInputElement).value;
    try {
      const response = await this.account.passwordRecovery(email);
      if (response) {
        this.onDismiss.emit();
      }
    } catch (error) {
      console.error(error);
    }
  }

  dismiss() {
    this.onDismiss.emit();
  }
}
