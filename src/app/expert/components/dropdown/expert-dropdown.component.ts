import { Component, OnInit, Input } from '@angular/core';
import { ExpertService } from 'src/services/expert.service';

@Component({
  selector: 'app-expert-dropdown',
  templateUrl: './expert-dropdown.component.html',
  styleUrls: ['./expert-dropdown.component.scss']
})
export class ExpertDropdownComponent implements OnInit {
  @Input() data: any;

  isOpen: boolean = false;
  requestData: any;
  profileRoute: string = "";
  dayDate: string = "";
  options: any = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  constructor(
    private expert: ExpertService
  ) { }

  async ngOnInit() {
    try {
      this.requestData = await this.expert.getById(this.data.id);
      this.profileRoute = `/profile/${this.data.id}`;
      this.dayDate = new Date(this.data.dayDate).toLocaleDateString("es-ES", this.options);
    } catch (error) {
      console.error(error);
    }
  }
}
