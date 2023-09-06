import { Component, OnInit } from '@angular/core';
import { ExpertService } from 'src/services/expert.service';
 @Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userData: any; 
  newAlert: boolean = false;
  isLogged: boolean = false;
  isExpert: boolean = false;
  toggleLoginModal: boolean = false;
  status: string = '';
  isAdmin: boolean = false;

  profilePic: string = '';
  username: string = '';
  userRoute: string = '/user/profile';

  constructor(
  ) { }
  
  ngOnInit(): void {
    const account = localStorage.getItem('account');
    if (account) {
      this.isLogged = true;
      this.userData = JSON.parse(account);
      this.username = this.userData.data.username;
      this.profilePic = this.userData.data.profilePic;
      this.isExpert = this.userData.data.isExpert;
      this.status = this.userData.data.status;

      if (this.isExpert || this.status === 'superAdmin') {
        this.userRoute = '/expert/profile';
      }

      if (this.status === 'superAdmin') {
        this.isAdmin = true;
      }
    }
  }
}