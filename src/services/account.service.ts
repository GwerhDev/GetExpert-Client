import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ConfigService } from "src/services/config.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  private apiPath: string;
  private headersWithContentType: HttpHeaders;
  private headersWithoutContentType: HttpHeaders;
  private httpOptionsWithContentType: object;
  private httpOptionsWithoutContentType: object;

  constructor(
    private router: Router,
    private http: HttpClient,
    private config: ConfigService,
    private jwtHelper: JwtHelperService,
    private auth: AuthService,
    private route: ActivatedRoute,
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

  async pendingResponse(_id: string) {
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
      const url: string = `${this.apiPath}/account/pending-response/${_id}`;
      const response: any = await this.http.get(url, this.httpOptionsWithoutContentType).toPromise();
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async validation() {
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

    this.route.queryParams.subscribe(async (params) => {
      try {
        const token = await params['token'];
        if (token) {
          localStorage.setItem('token', token);
          const decodedToken = await this.jwtHelper.decodeToken(token);
          localStorage.setItem('userToken', JSON.stringify(decodedToken));
          if (decodedToken.data.error) {
            if (decodedToken.data.msg) {
              if (decodedToken.data.isExpert) this.router.navigate(['/expert/register']);
              else this.router.navigate(['/user/register']);
            }
          } else {
            await this.profileData(decodedToken.data._id);
            if (decodedToken.data.status === "superAdmin"){
              this.router.navigate(['/']);
            } else if (decodedToken.data.error?.existingUser && !decodedToken.data.isExpert) {
              this.router.navigate(['/user/register']);
            } else if (decodedToken.data.isExpert && decodedToken.data.status === "active") {
              this.router.navigate(['/expert/profile']);
            } else if (decodedToken.data.isExpert && decodedToken.data.status === "waitingApprove") {
              this.router.navigate(['/expert/profile']);
            } else if (decodedToken.data.isExpert && decodedToken.data.status === "inactive") {
              this.router.navigate(['/expert/register-info']);
            } else if (decodedToken.data.isExpert && decodedToken.data.status === "waitingEmail") {
              await this.emailVerification(decodedToken.data._id);
              await this.profileData(decodedToken.data._id);
              this.router.navigate(['/expert/register-info']);
            } else if (!decodedToken.data.isExpert && decodedToken.data.status === "active") {
              await this.profileData(decodedToken.data._id);
              this.router.navigate(['/user/profile']);
            } else if (!decodedToken.data.isExpert && decodedToken.data.status === "waitingEmail") {
              await this.emailVerification(decodedToken.data._id);
              await this.profileData(decodedToken.data._id);
              this.router.navigate(['/user/profile']);
            } else if (!decodedToken.data.isExpert && decodedToken.data.status === "inactive") {
              
            }
          }
        }
      } catch (error: any) {
        let response = error.error;
        console.error('Error al decodificar el token:', response);
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 5000);
      }
    });
  }

  async profileData(_id: string) {
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
      const url: string = `${this.apiPath}/account/profile-me/${_id}`;
      const response: any = await this.http.get(url, this.httpOptionsWithContentType).toPromise();
      const decodedToken = await this.jwtHelper.decodeToken(response.token);
      localStorage.setItem('account', JSON.stringify(decodedToken));
    } catch (error) {
      console.error('Error al obtener los datos del perfil:', error);
    }
  }

  async update(body: any, nextroute: any) {
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
      const url: string = `${this.apiPath}/account/profile-update/${body.data._id}`;
      localStorage.setItem('account', JSON.stringify(body));
      const response = await this.http.patch(url, body.data, this.httpOptionsWithContentType).toPromise();
      if (nextroute) {
        return this.router.navigate([nextroute]);
      };
      return response;
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      return false;
    }
  }

  async emailVerification(id: string) {
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
      const url: string = `${this.apiPath}/account/mail-verification/${id}`;
      await this.http.patch(url, this.httpOptionsWithContentType).toPromise();
    } catch (error) {
      console.error('Error al verificar email: ', error);
    }
  }

  async passwordRecovery(email: string) {
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
      const url: string = `${this.apiPath}/account/password-recovery/${email}`;
      await this.http.post(url, this.httpOptionsWithContentType).toPromise();
      return true;
    } catch (error) {
      console.error('Error al verificar email:', error);
      return false;
    }
  }

  async passwordReset(body: any) {
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
      const url: string = `${this.apiPath}/account/password-reset/${body.id}`;
      const response = await this.http.patch(url, body, this.httpOptionsWithContentType).toPromise();
      return response;
    } catch (error) {
      return error;
    }
  }

  async passwordUpdate(body: any) {
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
      const url: string = `${this.apiPath}/account/password-update/`;
      const response = await this.http.patch(url, body, this.httpOptionsWithContentType).toPromise();
      return response;
    } catch (error) {
      return error;
    }
  
  }
}