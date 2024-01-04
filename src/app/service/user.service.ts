import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserProfile } from '../model/response/user-profile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userHostname = environment.baseUrl + "/user";

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getProfile(): Observable<UserProfile> {
    return this.httpClient.get<UserProfile>(this.userHostname + "/profile");
  }
}
