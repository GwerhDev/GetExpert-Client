import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-cmp',
  templateUrl: './select-cmp.component.html',
  styleUrls: ['./select-cmp.component.scss']
})
export class SelectCmpComponent implements OnInit {
  @Input() labelName: string = '';
  @Input() options: any;
  @Input() currentValue: string = `Selecciona ${ this.labelName === '' ? 'opción' : this.labelName }`;

  @Output() onSelectValue = new EventEmitter<string>();

  enter: boolean = false;

  constructor( ) { }

  ngOnInit(): void {
    if ( this.labelName === '' ) {
      this.currentValue = 'opción';
    } else {
      this.currentValue = `Selec. ${this.labelName}`;
    }
  }

  onEnter() {
    this.enter = true;
  }
  onLeave() {
    this.enter = false;
  }

  selectOption(item: string, index: string) {
    this.currentValue = item;
    this.onSelectValue.emit(index);
  }

}
