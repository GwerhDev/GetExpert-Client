import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "src/services/config.service";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})

export class AdminService {
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
  }

  async getPendingExperts(): Promise<any> {
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
      const response: any = await this.http.get(`${this.apiPath}/admin/get-waiting-approve-experts`, this.httpOptionsWithContentType).toPromise();
      return response.pendingExperts;
    } catch (error) {
      return this.auth.logout('/');
    }
  }

  async approveExpert(expertId: string): Promise<any> {
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
      const response = await this.http.patch(`${this.apiPath}/admin/approve-expert`, { expertId }, this.httpOptionsWithContentType).toPromise();
      return response;      
    } catch (error) {
      return this.auth.logout('/');
    }
  }

  async rejectExpert(expertId: string): Promise<any> {
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
      const response = await this.http.patch(`${this.apiPath}/admin/reject-expert`, { expertId }, this.httpOptionsWithContentType).toPromise();
      return response;      
    } catch (error) {
      return this.auth.logout('/');
    }
  }

  async addItemToList(schema: string, value: string) {
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
      await this.http.post(`${this.apiPath}/admin/add-item-to-list`, { schema, value }, this.httpOptionsWithContentType).toPromise();
    } catch (error) {
      return this.auth.logout('/');
    }
  }

  async addCommuneToList(regionId: string,  value: string) {
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
      await this.http.post(`${this.apiPath}/admin/add-commune-to-list`, { regionId, value }, this.httpOptionsWithContentType).toPromise();
    } catch (error) {
      return this.auth.logout('/');
    }
  }

  async removeItemFromList(schema: string, _id: string) {
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
      await this.http.delete(`${this.apiPath}/admin/remove-item-from-list/${schema}/${_id}`, this.httpOptionsWithContentType).toPromise();
    } catch (error) {
      return this.auth.logout('/');
    }
  }

  async removeCommuneFromList(_id: string) {
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
      await this.http.delete(`${this.apiPath}/admin/remove-commune-from-list/${_id}`, this.httpOptionsWithContentType).toPromise();
    } catch (error) {
      return this.auth.logout('/');
    }
  }
}