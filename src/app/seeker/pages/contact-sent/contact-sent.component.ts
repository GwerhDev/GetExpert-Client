import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ExpertService } from 'src/services/expert.service';

@Component({
  selector: 'app-contact-sent',
  templateUrl: './contact-sent.component.html',
  styleUrls: ['./contact-sent.component.scss']
})
export class ContactSentComponent implements OnInit {

  isLogged: boolean = false;
  decodedToken: any;
  expertData: any;
  options: any = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  username: string = '';
  profilePic: string = '';
  media: string = '';
  dayDate: string = '';
  hourDate: string = '';
  info: string = '';
  format: string = '';

  constructor(
    private route: ActivatedRoute,
    private jwtHelper: JwtHelperService,
    private expert: ExpertService,
  ) { }

  ngOnInit(): void {    
    localStorage.getItem('account') ? this.isLogged = true : this.isLogged = false;
    this.route.params.subscribe(async (params) => {
      const token = params['token'];
      this.decodedToken = this.jwtHelper.decodeToken(token);
      const { idExpert, dayDate, hourDate, info, media, format } = this.decodedToken.data;
      const dateRequest = new Date(dayDate);
      this.expertData = await this.expert.getById(idExpert);
      this.username = this.expertData.username;
      this.profilePic = this.expertData.profilePic;
      this.media = media;
      this.format = format;
      this.dayDate = dateRequest.toLocaleDateString("es-ES", this.options);
      this.hourDate = hourDate;
      this.info = info;
    })
  }
}
 