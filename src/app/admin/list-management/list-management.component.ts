import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/services/admin.service';
import { FormService } from 'src/services/form.service';

@Component({
  selector: 'app-list-management',
  templateUrl: './list-management.component.html',
  styleUrls: ['./list-management.component.scss']
})
export class ListManagementComponent implements OnInit {

  constructor(
    private form: FormService,
    private admin: AdminService,
  ) { }
  regionId: string = '';
  forms: any;
  area: any;
  media: any;
  region: any;
  commune: any;
  company: any;
  profession: any;
  institution: any;
  list: any;
  addActive: boolean = false;
  inputValue: string = '';

  async ngOnInit() {
    this.forms = await this.form.formList('all');
    this.area = { schema: 'area', name: 'Areas de expertise', list: this.forms.listArea };
    this.media = { schema: 'media', name: 'Medios', list: this.forms.listMedia};
    this.region = { schema: 'region', name: 'Regiones', list: this.forms.listRegion};
    this.commune = { schema: 'commune', name: 'Comunas', list: this.forms.listCommune};
    this.company = { schema: 'company', name: 'Empresas', list: this.forms.listCompany};
    this.profession = { schema: 'profession', name: 'Profesiones', list: this.forms.listProfession};
    this.institution = { schema: 'institution', name: 'Instituciones', list: this.forms.listInstitution};
    this.list = [
      this.area,
      this.media,
      this.region,
      this.commune,
      this.company,
      this.profession,
      this.institution
    ]
  }

  activateInput(elem: any): void {
    elem.addActive = true
  }

  cancelInput(elem: any): void {
    elem.addActive = false;
  }

  handleRegion(e: any){
    this.regionId = e.target.value;
  }

  async addInput(schema: string) {
    await this.admin.addItemToList(schema, this.inputValue);
    await this.ngOnInit();
    this.inputValue = '';
  }

  async addCommuneInput() {
    await this.admin.addCommuneToList(this.regionId, this.inputValue);
    await this.ngOnInit();
    this.inputValue = '';
  }

  async deleteItem(schema: string, _id: string) {
    await this.admin.removeItemFromList(schema, _id);
    await this.ngOnInit();
  }

  async deleteCommuneItem(_id: string) {
    await this.admin.removeCommuneFromList(_id);
    await this.ngOnInit();
  }
}
