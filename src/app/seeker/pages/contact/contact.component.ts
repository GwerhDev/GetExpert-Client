import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/services/contact.service';
import { ExpertService } from 'src/services/expert.service';
import { FormService } from 'src/services/form.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @ViewChild('usernameInput', { static: false }) usernameInput!: ElementRef;
  @ViewChild('emailInput', { static: false }) emailInput!: ElementRef;
  @ViewChild('phoneInput', { static: false }) phoneInput!: ElementRef;
  @ViewChild('mediaInput', { static: false }) mediaInput!: ElementRef;
  @ViewChild('formatInput', { static: false }) formatInput!: ElementRef;
  @ViewChild('dayDateInput', { static: false }) dayDateInput!: ElementRef;
  @ViewChild('hourDateInput', { static: false }) hourDateInput!: ElementRef;
  @ViewChild('infoInput', { static: false }) infoInput!: ElementRef;

  toggleLoginModal: boolean = false;
  isButtonDisabled: boolean = true;

  expertData: any;
  dataExpert: any;
  idExpert: string = '';
  emailExpert: string = '';
  usernameExpert: string = '';
  profilePicExpert: string = '';
  profileRouteExpert: string = '';

  requestData: any;
  requesterData: any;

  mediaList: any;
  formatList: any = ['Presencial', 'Online'];

  idRequester: string = '';
  emailRequester: string = '';
  phoneRequester: string = '';
  usernameRequester: string = '';
  mediaRequest: string = '';
  formatRequest: string = '';
  dayDateRequest: Date = new Date();
  hourDateRequest: string = '';
  infoRequest: string = '';

  constructor(
    private router: Router,
    private contact: ContactService,
    private route: ActivatedRoute,
    private expert: ExpertService,
    private form: FormService
  ) { }

  ngOnInit(): void {
    const requester: any = localStorage.getItem('account');
    this.requesterData = JSON.parse(requester).data;
    this.idRequester = this.requesterData._id;
    this.usernameRequester = this.requesterData.username;
    this.emailRequester = this.requesterData.email;
    this.phoneRequester = this.requesterData.phone;
    
    this.route.params.subscribe(async (params) => {
      this.idExpert = params['id'];
      this.expertData = await this.expert.getById(this.idExpert);
      this.mediaList = await this.form.formList('media');
      this.mediaList = this.mediaList.listMedia;
      this.usernameExpert = this.expertData.username;
      this.emailExpert = this.expertData.email;
      this.profilePicExpert = this.expertData.profilePic;
      this.profileRouteExpert = `/profile/${this.idExpert}`;
    });
  }

  validateFields(): void {
    const username = (<HTMLInputElement>document.getElementById('requester-username')).value;
    const email = (<HTMLInputElement>document.getElementById('requester-email')).value;
    const phone = (<HTMLInputElement>document.getElementById('requester-phone')).value;
    const media = (<HTMLInputElement>document.getElementById('requester-media')).value;
    const format = (<HTMLInputElement>document.getElementById('requester-format')).value;
    const dayDate = (<HTMLInputElement>document.getElementById('requester-dateEvent')).value;
    const hourDate = (<HTMLInputElement>document.getElementById('requester-timeEvent')).value;
    const info = (<HTMLInputElement>document.getElementById('requester-description')).value;
    if (username && email && phone && media && format && dayDate && hourDate && info) {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;
    }
  }

  async sendContact() {
    this.requestData = {
      id: this.idRequester,
      username: this.usernameInput.nativeElement.value,
      email: this.emailInput.nativeElement.value,
      phone: this.phoneInput.nativeElement.value,
      media: this.mediaInput.nativeElement.value,
      format: this.formatInput.nativeElement.value,
      dayDate: this.dayDateInput.nativeElement.value,
      hourDate: this.hourDateInput.nativeElement.value,
      info: this.infoInput.nativeElement.value,
    };

    this.dataExpert = { id: this.idExpert, email: this.emailExpert }

    const expert = await this.contact.sendRequest(this.dataExpert, this.requestData);
    this.router.navigate([`/contact-sent/${expert.token}`]);
  }
}
