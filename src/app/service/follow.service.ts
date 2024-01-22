import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseMessage } from '../model/response/response-message';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private followHostname = environment.baseUrl + "/user";

  constructor(
    private httpClient: HttpClient
  ) {

  }

  followUser(params: HttpParams): Observable<ResponseMessage> {
    return this.httpClient.post<ResponseMessage>(this.followHostname + "/follow", null, {params});
  }

  unfollowUser(params: HttpParams): Observable<ResponseMessage> {
    return this.httpClient.post<ResponseMessage>(this.followHostname + "/unfollow", null, {params});
  }
}
