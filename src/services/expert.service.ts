import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";AuthService
import { ConfigService } from './config.service';
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})

export class ExpertService {
  private apiPath: string;
  private token: string;
  private headersWithContentType: HttpHeaders;
  private httpOptionsWithContentType: object;
  private headersWithoutContentType: HttpHeaders;
  private httpOptionsWithoutContentType: object;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private auth: AuthService,
  ) {
    this.apiPath = this.config.getApi();
    this.token = this.auth.getToken();

    this.headersWithContentType = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });

    this.headersWithoutContentType = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    this.httpOptionsWithContentType = {
      headers: this.headersWithContentType
    };

    this.httpOptionsWithoutContentType = {
      headers: this.headersWithoutContentType
    };
  }

  async getAll(page: number, limit: number) {
    const url: string = `${this.apiPath}/expert/?page=${page}&limit=${limit}`;
    const response = await this.http.get(url).toPromise();
    return response;
  }

  async getById(id: string) {
    this.token = this.auth.getToken();
    this.headersWithoutContentType = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    this.httpOptionsWithoutContentType = {
      headers: this.headersWithoutContentType
    };
    
    try {
      const url: string = `${this.apiPath}/expert/${id}`;
      const response = await this.http.get(url, this.httpOptionsWithoutContentType).toPromise();
      return response;
    } catch (error) {
      return this.auth.logout('/');
    }
  }

  async getByBody(name: string, expertise: string, region: string, commune: string, media: string, mode: string, page: number, limit: number) {
    const formData = { name, expertise, region, commune, media, mode };
    const url: string = `${this.apiPath}/expert/getfiltered?page=${page}&limit=${limit}`;
    const response = await this.http.post(url, formData).toPromise();
    return response;
  }
}
