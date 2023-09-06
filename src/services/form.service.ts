import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ConfigService } from "src/services/config.service";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})

export class FormService {
  private apiPath: string;
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
  };

  async formList(request: string) {
    try {
      const url: string = `${this.apiPath}/form-list/get-${request}-list`;
      const response: any = await this.http.get(url, this.httpOptionsWithoutContentType).toPromise();
      return response;
    } catch (error) {
      return this.auth.logout('/')
    };
  };

  async formFilter() {
    try {
      const url: string = `${this.apiPath}/form-list/filter`;
      const response: any = await this.http.get(url, this.httpOptionsWithoutContentType).toPromise();
      return response;
    } catch (error) {
      return this.auth.logout('/')
    }
  }

  async step1() {
    try {
      const url: string = `${this.apiPath}/form-list/expert-register/step1`;
      const response: any = await this.http.get(url, this.httpOptionsWithoutContentType).toPromise();
      return response;
    } catch (error) {
      return this.auth.logout('/')
    }
  };

  async step2() {
    try {
      const url: string = `${this.apiPath}/form-list/expert-register/step2`;
      const response: any = await this.http.get(url, this.httpOptionsWithoutContentType).toPromise();
      return response;
    } catch (error) {
      return this.auth.logout('/')
    }
  };

  async step3() {
    try {
      const url: string = `${this.apiPath}/form-list/expert-register/step3`;
      const response: any = await this.http.get(url, this.httpOptionsWithoutContentType).toPromise();
      return response;
    } catch (error) {
      return this.auth.logout('/')
    }
  };

  async step4() {
    try {
      const url: string = `${this.apiPath}/form-list/expert-register/step4`;
      const response: any = await this.http.get(url, this.httpOptionsWithoutContentType).toPromise();
      return response;
    } catch (error) {
      return this.auth.logout('/')
    }
  };

  async step5() {
    try {
      const url: string = `${this.apiPath}/form-list/expert-register/step5`;
      const response: any = await this.http.get(url, this.httpOptionsWithoutContentType).toPromise();
      return response;
    } catch (error) {
      return this.auth.logout('/')
    }
  };
}

