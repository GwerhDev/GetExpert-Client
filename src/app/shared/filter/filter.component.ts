import { Component, EventEmitter, OnInit, Output, Input, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { ExpertService } from 'src/services/expert.service';
import { FormService } from 'src/services/form.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @ViewChild('nameInput', { static: false }) nameInput!: ElementRef;

  @Input() limit: number = 30;
  @Input() page: number = 1;
  
  @Output() setTotalPages: EventEmitter<any> = new EventEmitter<any>();
  @Output() itemsChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() loggedChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() optionsChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() showLoaderChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() showingTextChanged: EventEmitter<any> = new EventEmitter<any>();
  
  isLogged: boolean = false;
  showingText: string = 'Mostrando a todos los expertos';

  area: any[] = [];
  mode: any[] = [];
  media: any[] = [];
  regions: any[] = [];
  commune: any[] = [];

  items: any;
  options: any;
  filtered: any;

  totalPages: number = 0;
  
  expertDB: any
  selectedMode: any = [];
  selectedArea: any = [];
  selectedMedia: any = [];
  selectedRegion: any = [];
  selectedCommune: any = [];
  
  name: string = '';
  currentCommune: string = '';

  constructor(
    private expert: ExpertService,
    private form: FormService,
  ) { }

  async ngOnInit() {
    const account = localStorage.getItem('account');
    if(account) {
      this.isLogged = true;
      this.loggedChanged.emit(this.isLogged);
    }
    this.showLoaderChanged.emit(true);
    
    this.expertDB = await this.expert.getAll(this.page, this.limit);
    this.options = await this.form.formFilter();
    this.items = this.expertDB?.users;
    this.totalPages = this.expertDB?.totalPages;
    this.mode = this.options.listMode;
    this.media = this.options.listMedia;
    this.regions = this.options.listRegion;
    this.area = this.options.listArea;
    this.filtered = this.items;
    this.itemsChanged.emit(this.items);
    this.setTotalPages.emit(this.totalPages);
    this.optionsChanged.emit(this.options);
    this.showLoaderChanged.emit(false);
    this.showingTextChanged.emit(this.showingText);
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['limit']) {
      this.onSearchFilter();
    }

    if(changes['page']) {
      this.onSearchFilter();
    }
  }
  
  dropdownValueChanged(e: any) {
    
  };

  handleNameInput() {
    this.name = this.nameInput.nativeElement.value;
  };
  
  onSelectModeFilter(id: string) {
    this.selectedMode = id;
  };

  onSelectAreaFilter(id: string) {
    this.selectedArea = id;
  };
  
  onSelectRegionFilter(id: string) {
    this.selectedRegion = id;
    
    if(!this.selectedRegion) {
      this.commune = [];
      this.selectedCommune = [];
      this.currentCommune = '';
      return;
    } 
    let idArray = this.options.listRegion.filter((item: any) => item._id === id)[0].commune;
    this.commune = this.options.listCommune.filter((item: any) => idArray.includes(item._id));
    this.selectedCommune = [];
    this.currentCommune = '';
  };
  
  onSelectCommuneFilter(id: string) {
    this.selectedCommune = id;
  };
  
  onSelectMediaFilter(id: string) {
    this.selectedMedia = id;
  };

  async onSearchFilter() {
    this.expertDB = await this.expert.getByBody(this.name, this.selectedArea, this.selectedRegion, this.selectedCommune, this.selectedMedia, this.selectedMode, this.page, this.limit);
    this.filtered = this.expertDB?.users;
    this.totalPages = this.expertDB?.totalPages;
    if(this.filtered?.length === this.items?.length){
      this.showingText = 'Mostrando a todas las expertos';
    } else {
      this.showingText = `Mostrando a ${this.filtered.length} experts`;
    }
    this.setTotalPages.emit(this.totalPages);
    this.itemsChanged.emit(this.filtered);
    this.showingTextChanged.emit(this.showingText);
  };

  getNameById(id: any, array: any) {
    let idArray: any[] = [];
    array.filter((media: any) => { 
      for(let i of id) {
        if(i == media._id) {
          idArray.push(media.name)
        }
      }
     }
    )
    return idArray;
  }
}
