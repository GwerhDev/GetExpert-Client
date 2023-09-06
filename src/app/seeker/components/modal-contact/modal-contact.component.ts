import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/services/config.service';
import { ContactService } from 'src/services/contact.service';

@Component({
  selector: 'app-modal-contact',
  templateUrl: './modal-contact.component.html',
  styleUrls: ['./modal-contact.component.scss']
})
export class ModalContactComponent implements OnInit {

  @Input() isOpen: boolean = false;
  @Input() expertData: any;
  
  @Output() onDismiss = new EventEmitter();
  @Output() onAddContact = new EventEmitter();

  constructor( 
    private router: Router,
    private contact: ContactService,
    ) { }

  ngOnInit(): void {
  }

  dismiss() {
    this.onDismiss.emit();
  }

  addContact() {
    this.onAddContact.emit();
  }

  async sendRequest() {
    try {
      const response = await this.contact.sendRequest(this.expertData._id, null);
      this.router.navigate([`/contact-sent/${response.token}`]);
    } catch (error) {
      console.error(error);
    }
  }

}
