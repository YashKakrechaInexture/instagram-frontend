import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseMessage } from '../model/response/response-message';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostResponse } from '../model/response/post-response';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postHostname = environment.baseUrl + "/post";

  constructor(
    private httpClient: HttpClient
  ) { }

  uploadPostPic(formData: FormData): Observable<ResponseMessage> {
    return this.httpClient.post<ResponseMessage>(this.postHostname, formData);
  }

  getAllPostsByUsername(params: HttpParams): Observable<PostResponse[]>{
    return this.httpClient.get<PostResponse[]>(this.postHostname, {params});
  }

  getPostById(id: number): Observable<PostResponse>{
    return this.httpClient.get<PostResponse>(this.postHostname + "/" + id);
  }

  likePost(params: HttpParams): Observable<ResponseMessage>{
    return this.httpClient.post<ResponseMessage>(this.postHostname + "/like", null, {params});
  }

  unlikePost(params: HttpParams): Observable<ResponseMessage>{
    return this.httpClient.post<ResponseMessage>(this.postHostname + "/unlike", null, {params});
  }
}
