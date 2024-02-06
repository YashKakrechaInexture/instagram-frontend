import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { MessageRequest } from '../model/request/message-request';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../model/response/message';
import { environment } from 'src/environments/environment';
import { ChatRoomResponse } from '../model/response/chat-room-response';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chatHostname = environment.baseUrl + "/chat";

  constructor(
    private httpClient: HttpClient
  ) { }

  getMessages(recipient: string): Observable<Message[]> {
    return this.httpClient.get<Message[]>(this.chatHostname + "/" + recipient);
  }

  getChatRoomList(): Observable<ChatRoomResponse[]> {
    return this.httpClient.get<ChatRoomResponse[]>(this.chatHostname + "/room-list");
  }
}
