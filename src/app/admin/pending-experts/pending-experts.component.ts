import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/services/admin.service';

@Component({
  selector: 'app-pending-experts',
  templateUrl: './pending-experts.component.html',
  styleUrls: ['./pending-experts.component.scss']
})
export class PendingExpertsComponent implements OnInit {
  pendingExperts: any;
  isCodeAdmin: boolean = false;
  profilePic: string = '';
  adminData: any;

  constructor(
    private admin: AdminService,
    private router: Router,
  ) { }

  async ngOnInit() {

    this.adminData = localStorage.getItem('account')
    if(!this.adminData) {
      this.router.navigate(['/']);
      return;
    }
    
    this.adminData = JSON.parse(this.adminData)
    
    if(this.adminData.data.status === 'superAdmin') {
      this.pendingExperts = await this.admin.getPendingExperts();
      return;
    } else {
      this.router.navigate(['/']);
      return;
    }
  }

  async publishExpert(id: string) {
    await this.admin.approveExpert(id);
    this.pendingExperts = await this.admin.getPendingExperts();
  }

  async rejectExpert(id: string) {
    await this.admin.rejectExpert(id);
    this.pendingExperts = await this.admin.getPendingExperts();
  }
}
