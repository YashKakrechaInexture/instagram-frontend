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

  getProfile(params: HttpParams): Observable<UserProfile> {
    return this.httpClient.get<UserProfile>(this.userHostname + "/profile", {params});
  }

  updateProfilePic(formData: FormData): Observable<ResponseMessage> {
    return this.httpClient.put<ResponseMessage>(this.userHostname + "/profile-pic", formData);
  }

  searchUser(params: HttpParams): Observable<SearchUserResponse[]> {
    return this.httpClient.get<SearchUserResponse[]>(this.userHostname + "/searchUser", {params});
  }

  followersList(params: HttpParams): Observable<SearchUserResponse[]> {
    return this.httpClient.get<SearchUserResponse[]>(this.userHostname + "/followersList", {params});
  }

  followingList(params: HttpParams): Observable<SearchUserResponse[]> {
    return this.httpClient.get<SearchUserResponse[]>(this.userHostname + "/followingList", {params});
  }
}
