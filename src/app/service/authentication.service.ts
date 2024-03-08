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
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenResponse } from '../model/response/token-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private hostname = environment.baseUrl;

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private websocketService: WebsocketService,
    private jwtHelperService: JwtHelperService
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

  public setToken(value: string): void {
    this.cookieService.set('token', value, undefined, '/', undefined, false, 'Strict');
  }

  public getToken(): string {
    return this.cookieService.get('token');
  }

  public getClaimFromToken(claim: string): any {
    const token: string = this.getToken();
    if(token){
      const decodedToken : TokenResponse|null = this.jwtHelperService.decodeToken(token);
      if(decodedToken){
        return decodedToken[claim as keyof TokenResponse];
      }
    }
    return '';
  }

  public isLoggedIn(): boolean {
    return this.cookieService.get('token')!=="";
  }

  public logout(): void {
    this.cookieService.delete('token');
    // todo : unsubscribe on logout
    // this.websocketService.unsubscribe();
  }
}
