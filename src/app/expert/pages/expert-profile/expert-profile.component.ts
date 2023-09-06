import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expert-profile',
  templateUrl: './expert-profile.component.html',
  styleUrls: ['./expert-profile.component.scss']
})
export class ExpertProfileComponent implements OnInit {

  activeView: number = 2;

  constructor(
  ) { }

  ngOnInit(): void {

  }

  selectView( view: number ) {
    this.activeView = view;
  }
}
