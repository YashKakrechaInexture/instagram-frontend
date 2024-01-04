import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../model/request/login-request';
import { LoginResponse } from '../model/response/login-response';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authenticateHostname = environment.baseUrl + "/authenticate";

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {
  }

  public authenticate(loginRequest : LoginRequest){
    return this.httpClient.post<LoginResponse>(this.authenticateHostname,loginRequest);
  }

  public setToken(token: string): void {
    this.cookieService.set('token', token, undefined, '/', undefined, true, 'Strict');
  }

  public getToken(): string {
    return this.cookieService.get('token');
  }

  public isLoggedIn(): boolean {
    return this.cookieService.get('token')!=="";
  }

  public logout(): void {
    this.cookieService.delete('token');
  }
}
