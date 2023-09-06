import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  activeView: number = 0;

  constructor(
    
  ) { }

  ngOnInit() {

  }

  selectView( view: number ) {
    this.activeView = view;
  }
}
