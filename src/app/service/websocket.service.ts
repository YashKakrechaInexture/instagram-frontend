import { Injectable, OnDestroy } from '@angular/core';
import { Client, Message, Stomp, StompConfig } from '@stomp/stompjs';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageRequest } from '../model/request/message-request';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy {
  private socket!: WebSocket;
  private websocketUrl = environment.websocketUrl + '/ws';
  private stompClient?: Client;
  
  private messageQueuePrefix: string = '/user/';
  private messageQueueSuffix: string = '/queue/message';
  private chatPrefix: string = '/app/chat';

  constructor(
    
  ) {
    console.log('WebsocketService created');
  }

  ngOnDestroy(): void {
    // todo : disconnect
    // this.stompClient?.disconnect
  }

  // connect(){
  //   this.socket = new WebSocket(this.websocketUrl);
  //   console.log(this.socket);
  //   this.socket.onopen = (message)=>{
  //     console.log(message);
  //   };
  //   this.socket.subscribe((message)=>console.log(message));
  //   return this.socket.multiplex(
  //     '/user/yashkakrechainexture/queue/message',
  //     null,
  //     (message) => message
  //   );
  // }


  connect(): Observable<any> {
    return new Observable(observer => {
      const socket = new WebSocket(this.websocketUrl);
      this.stompClient = Stomp.over(socket);

      const stompConfig: StompConfig = {
        // Your custom headers if needed
        // headers: {},

        // Callback function for handling connection events
        onConnect: () => {
          observer.next({ connected: true });
        },

        // Callback function for handling errors
        onStompError: (error) => {
          observer.error(error);
        }
      };

      this.stompClient.configure(stompConfig);
      this.stompClient.activate();
    });
  }

  subscribe(username: string, callback: (message: Message) => void): void {
    this.stompClient?.subscribe(this.messageQueuePrefix + username + this.messageQueueSuffix, callback);
  }

  publish(messageRequest: MessageRequest): void {
    this.stompClient?.publish({
      destination: this.chatPrefix,
      body: JSON.stringify(messageRequest)
    });
  }
}
