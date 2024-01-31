import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  private username!: string;
  public message: string;
  @ViewChild('messageTextarea') private textarea!: ElementRef<HTMLTextAreaElement>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private chatService: ChatService
  ){
    this.message = "";
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.username = params['username'];
      }
    )
  }

  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      if (event.shiftKey || event.ctrlKey || event.altKey) {
        event.preventDefault();
        this.message += '\n';
        this.textarea.nativeElement.style.height = 'auto';
        this.textarea.nativeElement.style.height = this.textarea.nativeElement.scrollHeight + 'px';
      } else {
        this.sendMessage();
      }
    }
  }

  sendMessage(): void {
    console.log(this.message);
    this.message = '';
    this.textarea.nativeElement.style.height = 'auto';
    this.textarea.nativeElement.style.height = this.textarea.nativeElement.scrollHeight + 'px';
  }
}
