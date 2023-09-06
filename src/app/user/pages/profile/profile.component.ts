import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  activeView: number = 2;
  userData: any;

  constructor(
    private account: AccountService,
  ) { }

  ngOnInit() {
    try {
      const storedData = localStorage.getItem('userToken');
      if (storedData) {
        const { _id } = JSON.parse(storedData).data;
        this.account.profileData(_id);
      }
    } catch (error) {
      
    }
  }

  selectView( view: number ) {
    this.activeView = view;
  }

}
