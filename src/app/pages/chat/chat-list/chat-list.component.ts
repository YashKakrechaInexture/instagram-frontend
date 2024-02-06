import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ChatRoomResponse } from 'src/app/model/response/chat-room-response';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  chatRoomList: ChatRoomResponse[] = [];

  constructor(
    private chatService: ChatService,
    private toast: NgToastService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.chatService.getChatRoomList().subscribe(
      (response)=>{
        this.chatRoomList = response;
      },
      (error)=>{
        this.toast.error({detail:"ERROR", summary:error?.error?.error, duration:5000});
      }
    );
  }

  goToChat(username: string) {
    this.router.navigateByUrl('chat/' + username);
  }
}
