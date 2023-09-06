import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  production: boolean = environment.production;

  constructor(
  ){}

  getApi() {
    var api: string = ''
    if(this.production) {
      api = 'https://hm-api.fly.dev';
      return api;
    } else { 
      api = 'http://localhost:8080';
      return api;
    }
  }
}