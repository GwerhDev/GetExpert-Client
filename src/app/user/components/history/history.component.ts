import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/services/contact.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  data: any;

  constructor(
    private contact: ContactService
  ) { }

  async ngOnInit() {
    const account = localStorage.getItem('account');
    if(account){
      const id = JSON.parse(account).data._id;
      const response = await this.contact.getRequestsByMe(id)
      this.data = response;
    }
  }

}
