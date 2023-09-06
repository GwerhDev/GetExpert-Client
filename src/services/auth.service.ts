import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from './config.service';
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private userToken: any;
  private apiPath: string;
  
  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private router: Router,
    private jwtHelper: JwtHelperService,
    ) { 
      this.apiPath = this.config.getApi();
    }
    
  getToken() {
    var token = localStorage.getItem('token');

    if(token) {
      this.userToken = token;
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  googleAuth(userType: string, authType: string) {
    window.location.href = `${this.apiPath}/auth/${userType}/google/${authType}`;
  }
  
  linkedinAuth(userType: string, authType: string) {
    window.location.href = `${this.apiPath}/auth/${userType}/linkedin/${authType}`;
  }
  
  async innerSignUp(username: string, email: string, phone: string, password: string, userType: string) {
    try {
      const url: string = `${this.apiPath}/auth/${userType}/inner/signup`;
      const formData = { username, email, phone, password };
      const response = await this.http.post(url, formData).toPromise();
      localStorage.setItem('signup', JSON.stringify(response));
    } catch (error) {
      console.error('Error al registrarse:', error);
    }
  }
  
  async innerLogIn(email: string, password: string) {
    try {
      const url: string = `${this.apiPath}/auth/user/inner/login`;
      const formData = { email, password };
      const response: any = await this.http.post(url, formData).toPromise();
      
      const { token } = response;
      if (token) {
        this.router.navigate(['/auth'], { queryParams: { token } });
      } else {
        this.router.navigate(['/']);
      }
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error.error.error);
      const errorResponse = error.error;
      return errorResponse;
    }
  }
  
  logout(route: string) {
    localStorage.removeItem('account');
    localStorage.removeItem('userToken');
    localStorage.removeItem('token');
    if (route) {
      this.router.navigate([route])
    }
  }
  
  async decodeToken(token: string, redirect: string) {
    try {
      localStorage.removeItem('decodedToken');
      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        localStorage.setItem('decodedToken', JSON.stringify(decodedToken));
      } else {
        this.router.navigate([redirect]);
      }
    } catch (error) {
      this.router.navigate(['/expert/register']);
    }
  }
  
}
