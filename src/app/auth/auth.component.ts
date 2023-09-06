import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor( 
      private account: AccountService,
  ) { }

  message: string = 'Cargando...';

  async ngOnInit() {
    await this.account.validation();
  }
}
