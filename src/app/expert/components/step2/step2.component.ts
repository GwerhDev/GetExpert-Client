import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/services/account.service';
import { AuthService } from 'src/services/auth.service';
import { FormService } from 'src/services/form.service';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {
  @ViewChild('expertiseAreaInput', { static: false }) expertiseAreaInput!: ElementRef;
  @ViewChild('expertiseNameInput', { static: false }) expertiseNameInput!: ElementRef;
  @ViewChild('expertiseBioInput', { static: false }) expertiseBioInput!: ElementRef;

  @Input() userData: any;

  @Output() onNextStep = new EventEmitter<any>();
  @Output() onPrevStep = new EventEmitter<any>();
  @Output() dataChanged: EventEmitter<any> = new EventEmitter<any>();
  
  isButtonDisabled: boolean = false;
  

  options: any;
  areaOptions: any;
  
  area: any;
  idArea: string[] = [];
  name: string = '';
  bio: string = '';

  constructor(
    private account: AccountService,
    private route: Router,
    private form: FormService,
  ) { }

  async ngOnInit(): Promise<void>  {
    this.options = await this.form.step2();
    this.areaOptions = this.options.listArea;
    if (this.userData.data.expertise.length) {
      this.area = this.userData.data.expertise[0].area;
      this.name = this.userData.data.expertise[0].name;
      this.bio = this.userData.data.expertise[0].bio;
      this.idArea = this.userData.data.expertise[0].area?.map((item: any) => item._id);
    }
  }

  getNameById(id: any, array: any) {
    let idArray: any[] = [];
    array.filter((item: any) => { 
      for(let i of id) {
        if(i == item._id) {
          idArray.push(item.name)
        }
      }
     }
    )
    return idArray
  }

  addArea(): void {
    let idValue = this.expertiseAreaInput.nativeElement.value;
    let value = this.areaOptions.filter((item: any) => item._id === idValue)[0];
    
    if (!this.area?.length) {
      this.area = [value];
      this.idArea = [idValue];
    } else if (this.idArea?.length && !this.idArea?.includes(idValue)) {
      this.area = [...this.area, value];
      this.idArea = [...this.idArea, idValue];
    }
    this.setData();
  }

  addName(): void {
    this.name = this.expertiseNameInput.nativeElement.value;
    this.setData();
  }

  addBio(): void {
    this.bio = this.expertiseBioInput.nativeElement.value;
    this.setData();
  }

  setData(): void {
    if(this.userData.data.expertise.length) {
      this.userData.data.expertise[0].area = this.area;
      this.userData.data.expertise[0].name = this.name;
      this.userData.data.expertise[0].bio = this.bio;
    } else {
      this.userData.data.expertise = [{
        area: this.area,
        name: this.name,
        bio: this.bio
      }]
    }
    this.dataChanged.emit(this.userData);
  }

  async update() {
    this.isButtonDisabled = true;
    await this.account.update(this.userData, null);
    this.isButtonDisabled = false;
    this.route.navigate(['/expert/profile']);
  }

  async prevStep() {
    this.isButtonDisabled = true;
    await this.account.update(this.userData, null);
    this.isButtonDisabled = false;
    this.onPrevStep.emit();
  }

  async nextStep() {
    this.setData();
    this.isButtonDisabled = true;
    const response: any = await this.account.update(this.userData, null);
    this.isButtonDisabled = false;
    this.onNextStep.emit(response.message);
  }

  dismiss(index: number) {
    this.area.splice(index, 1);
    this.idArea.splice(index, 1);
  }
}
