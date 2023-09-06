import { Component, OnInit, Input } from '@angular/core';
import { ExpertService } from 'src/services/expert.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() data: any;

  isOpen: boolean = false;
  expertData: any;
  expertRoute: string = "";
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
    this.expertData = await this.expert.getById(this.data.idExpert);
    this.expertRoute = `/profile/${this.data.idExpert}`;
    this.dayDate = new Date(this.data.dayDate).toLocaleDateString("es-ES", this.options);
  }

}
