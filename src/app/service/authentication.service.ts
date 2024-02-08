import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../model/request/login-request';
import { LoginResponse } from '../model/response/login-response';
import { CookieService } from 'ngx-cookie-service';
import { SignupRequest } from '../model/request/signup-request';
import { ResponseMessage } from '../model/response/response-message';
import { EnableUserRequest } from '../model/request/enable-user-request';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private hostname = environment.baseUrl;

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private websocketService: WebsocketService
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

  public setToken(key: string, value: string): void {
    this.cookieService.set(key, value, undefined, '/', undefined, false, 'Strict');
  }

  public getToken(key: string): string {
    return this.cookieService.get(key);
  }

  public isLoggedIn(): boolean {
    return this.cookieService.get('token')!=="" && this.cookieService.get('username')!=="";
  }

  public logout(): void {
    this.cookieService.delete('token');
    this.cookieService.delete('username');
    // todo : unsubscribe on logout
    // this.websocketService.unsubscribe();
  }
}
