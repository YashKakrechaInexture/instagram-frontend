import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { Client, Stomp, StompConfig } from '@stomp/stompjs';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageRequest } from '../model/request/message-request';
import { Message } from '../model/response/message';
import { CookieService } from 'ngx-cookie-service';
import { ReadMessageRequest } from '../model/request/read-message-request';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy {
  private socket!: WebSocket;
  private websocketUrl = environment.websocketUrl + '/ws';
  private stompClient?: Client;
  public chatNotification: EventEmitter<Message> = new EventEmitter();
  
  private messageQueuePrefix: string = '/user/';
  private messageQueueSuffix: string = '/queue/message';
  private chatPrefix: string = '/app/chat';

  constructor(
    private cookieService: CookieService
  ) {
    console.log('WebsocketService created');
    this.connect();
  }

  ngOnDestroy(): void {
    console.log('WebsocketService destroyed');
    this.stompClient?.deactivate();
  }

  private connect() {
    const socket = new WebSocket(this.websocketUrl);
    this.stompClient = Stomp.over(socket);
    const stompConfig: StompConfig = {
      // Your custom headers if needed
      // headers: {},
      onConnect: () => {
        const loggedInUser = this.cookieService.get('username');
        if(loggedInUser !== ""){
          this.subscribe(loggedInUser);
        }
      }
    };

    this.stompClient.configure(stompConfig);
    this.stompClient.activate();
  }

  subscribe(username: string): void {
    this.stompClient?.subscribe(this.messageQueuePrefix + username + this.messageQueueSuffix,
      (message)=>{
        this.chatNotification.emit(JSON.parse(message.body));
      }
    );
  }

  unsubscribe(id: string): void {
    this.stompClient?.unsubscribe(id);
  }

  publish(messageRequest: MessageRequest): void {
    this.stompClient?.publish({
      destination: this.chatPrefix,
      body: JSON.stringify(messageRequest)
    });
  }

  readMessage(readMessageRequest: ReadMessageRequest): void {
    this.stompClient?.publish({
      destination: this.chatPrefix + '/read',
      body: JSON.stringify(readMessageRequest)
    });
  }
}
