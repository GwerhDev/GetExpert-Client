import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/services/contact.service';

@Component({
  selector: 'app-expert-history',
  templateUrl: './expert-history.component.html',
  styleUrls: ['./expert-history.component.scss']
})
export class ExpertHistoryComponent implements OnInit {
  data: any = [];
  id: any;
  requestForMe: boolean = true;
  requestByMe: boolean = false;

  constructor(
    private contact: ContactService
  ) { }

  async ngOnInit() {
    const account = localStorage.getItem('account');
    if(account){
      this.id = JSON.parse(account).data._id;
      const response: any = await this.contact.getRequestsForMe(this.id);
      for(let i = 0; i < response.length; i++){
        const data: any = {
          id: response[i].idRequester,
          media: response[i].media,
          phone: response[i].phone,
          format: response[i].format,
          dayDate: response[i].dayDate,
          hourDate: response[i].hourDate,
          info: response[i].info,
          status: response[i].status
        };
        this.data = [...this.data, data];
      }
    }
  }

  async handleRequest(e: any){
    const value = e.target.value;
    if(value === "for"){
      this.data = [];
      this.requestForMe = true;
      this.requestByMe = false;
      const response: any = await this.contact.getRequestsForMe(this.id);
      for(let i = 0; i < response.length; i++){
        const data: any = {
          id: response[i].idRequester,
          media: response[i].media,
          phone: response[i].phone,
          format: response[i].format,
          dayDate: response[i].dayDate,
          hourDate: response[i].hourDate,
          info: response[i].info,
          status: response[i].status
        };
        this.data = [...this.data, data];
      }
    } else if(value === "by"){
      this.data = [];
      this.requestForMe = false;
      this.requestByMe = true;
      const response: any = await this.contact.getRequestsByMe(this.id);
      for(let i = 0; i < response.length; i++){
        const data: any = {
          id: response[i].idExpert,
          media: response[i].media,
          phone: response[i].phone,
          format: response[i].format,
          dayDate: response[i].dayDate,
          hourDate: response[i].hourDate,
          info: response[i].info,
          status: response[i].status
        };
        this.data = [...this.data, data];
      }
    }
  }
}
