import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Input() message: string = 'Cargando...';

  constructor( 
  ) { }


  ngOnInit(): void {
  }
}
