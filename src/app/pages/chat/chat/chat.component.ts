import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MessageRequest } from 'src/app/model/request/message-request';
import { Message } from 'src/app/model/response/message';
import { MessagePageProfileResponse } from 'src/app/model/response/message-page-profile-response';
import { MessageStatus } from 'src/app/model/response/message-status';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ChatService } from 'src/app/service/chat.service';
import { UserService } from 'src/app/service/user.service';
import { WebsocketService } from 'src/app/service/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  private username!: string;
  @ViewChild('messageTextarea') private textarea!: ElementRef<HTMLTextAreaElement>;
  public messageContent: string = "";
  public messageList: Message[] = [];
  public messagesGroupedByDate: { [key: string]: Message[] } = {};
  public recipient?: MessagePageProfileResponse;

  constructor(
    private activatedRoute: ActivatedRoute,
    private chatService: ChatService,
    private userService: UserService,
    private websocketService: WebsocketService,
    private authenticationService: AuthenticationService,
    private toast: NgToastService,
    private router: Router,
    private datePipe: DatePipe
  ){
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.username = params['username'];
        this.setProfile();
        this.getMessages();
      }
    );
    this.websocketService.chatNotification.subscribe(
      (message)=>{
        if(message.sender===this.username){
          message.date = this.getDateFromTimestamp(message.timestamp);
          this.pushMessage(message);
        }
      }
    );
  }

  private setProfile(): void {
    const params = new HttpParams().set('username', this.username);
    this.userService.getMessagePageProfile(params).subscribe(
      (response)=>{
        this.recipient = response;
      },
      (error)=>{
        this.toast.error({detail:"ERROR", summary:error?.error?.error, duration:5000});
      }
    );
  }

  private getMessages(): void {
    this.chatService.getMessages(this.username).subscribe(
      (response)=>{
        this.messageList = response;
        this.messagesGroupedByDate = this.groupMessagesByDate(this.messageList);
      },
      (error)=>{
        this.toast.error({detail:"ERROR", summary:error?.error?.error, duration:5000});
      }
    )
  }

  private groupMessagesByDate(messages: Message[]): { [key: string]: Message[] } {
    const grouped: { [key: string]: Message[] } = {};
    messages.forEach((message) => {
      message.date = this.getDateFromTimestamp(message.timestamp);
      const date = message.date || '';
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(message);
    });
    return grouped;
  }

  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (event.shiftKey || event.ctrlKey || event.altKey) {
        this.messageContent += '\n';
        this.textarea.nativeElement.style.height = 'auto';
        this.textarea.nativeElement.style.height = this.textarea.nativeElement.scrollHeight + 'px';
      } else if(this.messageContent !== '') {
        this.sendMessage();
      }
    }
  }

  sendMessage(): void {
    const messageRequest: MessageRequest = {
      sender: this.authenticationService.getToken('username'),
      recipient: this.recipient?.username!,
      message: this.messageContent
    }
    this.websocketService.publish(messageRequest);
    const messageResponse: Message = {
      sender: this.authenticationService.getToken('username'),
      recipient: this.recipient?.username!,
      message: this.messageContent,
      timestamp: new Date(),
      status: MessageStatus.RECEIVED
    }
    messageResponse.date = this.getDateFromDateString(messageResponse.timestamp.toISOString());
    this.pushMessage(messageResponse);
    this.messageContent = '';
    this.textarea.nativeElement.style.height = '';
  }

  goToProfile(){
    this.router.navigateByUrl('profile/'+this.recipient?.username);
  }

  private pushMessage(message: Message): void {
    const date = message.date || '';
    if (!this.messagesGroupedByDate[date]) {
      this.messagesGroupedByDate[date] = [];
    }
    this.messagesGroupedByDate[date].push(message);
  }

  private getDateFromTimestamp(timestamp: Date): string {
    const date: string = timestamp?.toString().split('T')[0]; 
    return this.datePipe.transform(date, 'dd MMM, yyyy')!;
  }

  private getDateFromDateString(date: string): string {
    return this.datePipe.transform(date, 'dd MMM, yyyy')!;
  }
}
