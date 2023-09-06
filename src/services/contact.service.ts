import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "src/services/config.service";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  private apiPath: string;
  private headersWithContentType: HttpHeaders;
  private httpOptionsWithContentType: object;
  private headersWithoutContentType: HttpHeaders;
  private httpOptionsWithoutContentType: object;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private auth: AuthService
  ) { 
    this.apiPath = this.config.getApi();

    this.headersWithContentType = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.auth.getToken()
    });

    this.headersWithoutContentType = new HttpHeaders({
      'Authorization': 'Bearer ' + this.auth.getToken()
    });

    this.httpOptionsWithContentType = {
      headers: this.headersWithContentType
    };

    this.httpOptionsWithoutContentType = {
      headers: this.headersWithoutContentType
    };
  }

  async sendRequest(expertData: any, requestData: any): Promise<any> {
    this.apiPath = this.config.getApi();

    this.headersWithContentType = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.auth.getToken()
    });

    this.headersWithoutContentType = new HttpHeaders({
      'Authorization': 'Bearer ' + this.auth.getToken()
    });

    this.httpOptionsWithContentType = {
      headers: this.headersWithContentType
    };

    this.httpOptionsWithoutContentType = {
      headers: this.headersWithoutContentType
    };
    try {
      const url: string = `${this.apiPath}/contact-request`;
      const formData = { expertData, requestData };
      const response = await this.http.post(url, formData, this.httpOptionsWithContentType).toPromise();
      return response;
    } catch (error) {
      return this.auth.logout('/');
    }
  }

  async getRequestsByMe(idUser: any): Promise<any> {
    this.apiPath = this.config.getApi();

    this.headersWithContentType = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.auth.getToken()
    });

    this.headersWithoutContentType = new HttpHeaders({
      'Authorization': 'Bearer ' + this.auth.getToken()
    });

    this.httpOptionsWithContentType = {
      headers: this.headersWithContentType
    };

    this.httpOptionsWithoutContentType = {
      headers: this.headersWithoutContentType
    };
    try {
      const url: string = `${this.apiPath}/contact-request/my-requests/by/${idUser}`;
      const response = await this.http.get(url, this.httpOptionsWithoutContentType).toPromise();
      return response;
    } catch (error) {
/*       return this.auth.logout('/'); */
    }
  }
  async getRequestsForMe(idUser: any): Promise<any> {
    this.apiPath = this.config.getApi();

    this.headersWithContentType = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.auth.getToken()
    });

    this.headersWithoutContentType = new HttpHeaders({
      'Authorization': 'Bearer ' + this.auth.getToken()
    });

    this.httpOptionsWithContentType = {
      headers: this.headersWithContentType
    };

    this.httpOptionsWithoutContentType = {
      headers: this.headersWithoutContentType
    };
    try {
      const url: string = `${this.apiPath}/contact-request/my-requests/for/${idUser}`;
      const response = await this.http.get(url, this.httpOptionsWithoutContentType).toPromise();
      return response;
    } catch (error) {
/*       return this.auth.logout('/');
 */    }
  }
}