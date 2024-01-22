import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserProfile } from '../model/response/user-profile';
import { Observable } from 'rxjs';
import { ResponseMessage } from '../model/response/response-message';
import { SearchUserResponse } from '../model/response/search-user-response';

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

  updateProfilePic(formData: FormData): Observable<ResponseMessage> {
    return this.httpClient.put<ResponseMessage>(this.userHostname + "/profile-pic", formData);
  }

  searchUser(params: HttpParams): Observable<SearchUserResponse[]> {
    return this.httpClient.get<SearchUserResponse[]>(this.userHostname + "/searchUser", {params});
  }
}
