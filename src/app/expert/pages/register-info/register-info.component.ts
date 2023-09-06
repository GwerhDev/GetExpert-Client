import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-register-info',
  templateUrl: './register-info.component.html',
  styleUrls: ['./register-info.component.scss']
})
export class RegisterInfoComponent implements OnInit {

  dataActive: number = 1;
  storedData: any;
  userData: any;
  showSnack: boolean = false;
  messageSnack: string = '';

  constructor(
    private router: Router,
    private account: AccountService,
  ) {}

  async ngOnInit() {
    const numb = localStorage.getItem('numb');
    const parsedNumb = numb ? +numb : null;
    this.storedData = localStorage.getItem('account');
    if (parsedNumb && parsedNumb >= 5) {
      localStorage.setItem('numb', '1');
    }
    this.dataActive = parsedNumb || 1;

    if(this.storedData) {
      this.userData = JSON.parse(this.storedData);
      await this.account.profileData(this.userData.data._id);
    }
  }

  dataChanged(data: any) {
    this.userData = data;
    localStorage.setItem('account', JSON.stringify(data));
  }

  async setStep(step: number) {
    this.account.update(this.userData, null);
    this.dataActive = step;
    localStorage.setItem('numb', String(step));
  }

  prevStep(): void {
    localStorage.setItem('numb', String(this.dataActive - 1));
    this.dataActive = this.dataActive - 1;
  }

  nextStep(msg: string): void {
    if (this.dataActive >= 5) {
      localStorage.setItem('numb', '1');
      this.router.navigate(['/expert/register-success']);
    } else {
      this.messageSnack = '';
      if(msg) {
        this.messageSnack = msg;
        setTimeout(() => {
          this.showSnack = true; 
          setTimeout(() => {
            this.showSnack = false;
          }, 5000);
        }, 300);
      }
      localStorage.setItem('numb', String(this.dataActive + 1));
      this.dataActive = this.dataActive + 1;
    }
  }
}
