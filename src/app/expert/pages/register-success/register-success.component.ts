import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-register-success',
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.scss']
})
export class RegisterSuccessComponent implements OnInit {
  userToken: any;
  constructor(
    private account: AccountService,
  ) { }

  async ngOnInit() {
    this.userToken = localStorage.getItem('userToken')!;
    this.userToken = JSON.parse(this.userToken);
    if(this.userToken?.data?._id) {
      await this.account.profileData(this.userToken.data._id)
    }
  }

}
