import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  isLogged: boolean = false;
  showLoader: boolean = false;
  showModal: boolean = false;
  showingText: string = 'Mostrando a todas las expertos';

  limit: number = 30;
  page: number = 1;
  totalPages: number = 0;
  
  items: any;
  mediaList: any;
  professionList: any

  constructor() {}

  ngOnInit() { 
  }

  setPage(page: number) {
    this.page = page;
  }

  handleLimit(e: any) {
    this.limit = e.target.value;
  }

  openModal() {
    this.showModal = true;
  }

  receiveTotalPages(totalPages: number){
    this.totalPages = totalPages;
  }

  recieveShowLoader(showLoader: boolean) {
    this.showLoader = showLoader;
  }

  receiveItems(items: any) {
    this.items = items;
  }

  receiveShowingText(text: string) {
    this.showingText = text;
  }

  recieveLogged(isLogged: boolean) {
    this.isLogged = isLogged;
  }
  
  recieveOptions(options: any) {
    this.mediaList = options.listMedia;
    this.professionList = options.listProfession;
  }

  getNameById(id: any, array: any) {
    let idArray: any[] = [];
    array?.filter((item: any) => { 
      for(let i of id) {
        if(i == item._id) {
          idArray.push(item.name)
        }
      }
     }
    )
    return idArray;
  }

  getRange(n: number): number[] {
    const range = [];
    for (let i = 0; i < n; i++) {
      range.push(i);
    }
    return range;
  }
}
