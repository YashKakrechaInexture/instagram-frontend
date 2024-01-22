import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../model/request/login-request';
import { LoginResponse } from '../model/response/login-response';
import { CookieService } from 'ngx-cookie-service';
import { SignupRequest } from '../model/request/signup-request';
import { ResponseMessage } from '../model/response/response-message';
import { EnableUserRequest } from '../model/request/enable-user-request';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private hostname = environment.baseUrl;

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {
  }

  public authenticate(loginRequest : LoginRequest){
    return this.httpClient.post<LoginResponse>(this.hostname + "/authenticate", loginRequest);
  }

  public signup(signupRequest : SignupRequest){
    return this.httpClient.post<ResponseMessage>(this.hostname + "/user/signup", signupRequest);
  }

  public enableUser(enableUserRequest : EnableUserRequest){
    return this.httpClient.post<ResponseMessage>(this.hostname + "/user/enable", enableUserRequest);
  }

  public setToken(token: string): void {
    this.cookieService.set('token', token, undefined, '/', undefined, false, 'Strict');
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
