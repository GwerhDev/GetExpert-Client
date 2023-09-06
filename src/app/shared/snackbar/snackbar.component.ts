import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  showSnack: boolean = false;

  @Input() autoClose: boolean = false;
  @Input() show: boolean = false;
  @Input() message: string = '';

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.showSnack = this.show;
      if (this.autoClose) {
        setTimeout(() => {
          this.showSnack = false;
        }, 3000);
      }
    }, 250);
  }

  close() {
    this.showSnack = false;
  }

}
