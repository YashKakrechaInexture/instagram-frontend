import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Message } from 'src/app/model/response/message';
import { MessagePageProfileResponse } from 'src/app/model/response/message-page-profile-response';
import { ChatService } from 'src/app/service/chat.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  private username!: string;
  @ViewChild('messageTextarea') private textarea!: ElementRef<HTMLTextAreaElement>;
  public messageContent: string;
  public messageList: Message[] = [];
  public recipient?: MessagePageProfileResponse;

  constructor(
    private activatedRoute: ActivatedRoute,
    private chatService: ChatService,
    private userService: UserService,
    private toast: NgToastService,
    private router: Router
  ){
    this.messageContent = "";
    this.messageList = [
      {
        sender: "yash",
        recipient: "tom",
        message: "Hi",
        timestamp: new Date()
      },
      {
        sender: "yashkakrechainexture",
        recipient: "tom",
        message: "Hi",
        timestamp: new Date()
      },
      {
        sender: "yash",
        recipient: "tom",
        message: "Hi",
        timestamp: new Date()
      },
      {
        sender: "yashkakrechainexture",
        recipient: "tom",
        message: "Hi",
        timestamp: new Date()
      },
      {
        sender: "yash",
        recipient: "tom",
        message: "Hi",
        timestamp: new Date()
      },
      {
        sender: "yashkakrechainexture",
        recipient: "tom",
        message: "Hi",
        timestamp: new Date()
      },
      {
        sender: "yash",
        recipient: "tom",
        message: "Hi",
        timestamp: new Date()
      },
      {
        sender: "yash",
        recipient: "tom",
        message: "Hi",
        timestamp: new Date()
      },
      {
        sender: "yash",
        recipient: "tom",
        message: "Hi",
        timestamp: new Date()
      },
      {
        sender: "yashkakrechainexture",
        recipient: "tom",
        message: "Hi",
        timestamp: new Date()
      },
      {
        sender: "yash",
        recipient: "tom",
        message: "Hi",
        timestamp: new Date()
      },
      {
        sender: "yash",
        recipient: "tom",
        message: "Hi",
        timestamp: new Date()
      },
      {
        sender: "yashkakrechainexture",
        recipient: "tom",
        message: "Hi",
        timestamp: new Date()
      },
      {
        sender: "yash",
        recipient: "tom",
        message: "Hi",
        timestamp: new Date()
      },
      {
        sender: "yashkakrechainexture",
        recipient: "tom",
        message: "Hi",
        timestamp: new Date()
      },
      {
        sender: "yash",
        recipient: "tom",
        message: "Hi",
        timestamp: new Date()
      },
      {
        sender: "yash",
        recipient: "tom",
        message: "Hi",
        timestamp: new Date()
      },
      {
        sender: "yash",
        recipient: "tom",
        message: "Hi",
        timestamp: new Date()
      },
      {
        sender: "yashkakrechainexture",
        recipient: "tom",
        message: "Hi",
        timestamp: new Date()
      },
      {
        sender: "yash",
        recipient: "tom",
        message: "Hi",
        timestamp: new Date()
      },
      {
        sender: "yash",
        recipient: "tom",
        message: "Hi",
        timestamp: new Date()
      },
      {
        sender: "yashkakrechainexture",
        recipient: "tom",
        message: "Hi",
        timestamp: new Date()
      },
      {
        sender: "yash",
        recipient: "tom",
        message: "Hi",
        timestamp: new Date()
      },
      {
        sender: "yash",
        recipient: "tom",
        message: "Hi",
        timestamp: new Date()
      },
      {
        sender: "yash",
        recipient: "tom",
        message: "Hi",
        timestamp: new Date()
      },
      {
        sender: "yash",
        recipient: "tom",
        message: "Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello Hi hello ",
        timestamp: new Date()
      },
      {
        sender: "yashkakrechainexture",
        recipient: "tom",
        message: "Hi",
        timestamp: new Date()
      },
      {
        sender: "yashkakrechainexture",
        recipient: "tom",
        message: "Hi",
        timestamp: new Date()
      }
    ]
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.username = params['username'];
        this.setProfile();
      }
    )
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
    console.log(this.messageContent);
    this.messageContent = '';
    this.textarea.nativeElement.style.height = '';
  }

  goToProfile(){
    this.router.navigateByUrl('profile/'+this.recipient?.username);
  }
}
