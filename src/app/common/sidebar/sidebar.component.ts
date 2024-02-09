import { Component, ElementRef, EventEmitter, Output, Renderer2 } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ChatService } from 'src/app/service/chat.service';
import { WebsocketService } from 'src/app/service/websocket.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  public isClicked: boolean;
  public messageNotification: number;
  @Output() clickEvent = new EventEmitter<boolean>();

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private authenticationService: AuthenticationService,
    private chatService: ChatService,
    private websocketService: WebsocketService
  ){
    this.isClicked = true;
    this.messageNotification = 0;
  }
  ngOnInit(): void {
    this.clickEvent.emit(this.isClicked);
    this.chatService.getChatUnreadMessageCount().subscribe(
      (response)=>{
        this.messageNotification = response.unreadMessages;
      }
    );
    this.websocketService.chatNotification.subscribe(
      (message)=>{
        this.messageNotification++;
      }
    );
  }

  toggleClick(event:any) {
    this.isClicked = !this.isClicked;
    this.clickEvent.emit(this.isClicked);
    if (this.isClicked) {
      // Move the main element to the right when the sidebar is opened
      this.renderer.setStyle(document.body, 'margin-left', '250px');
      this.renderer.setStyle(document.body, 'transition-timing-function', 'ease');
      this.renderer.setStyle(document.body, 'transition-property', 'all');
      this.renderer.setStyle(document.body, 'transition-duration', '0.4s');
    } else {
      // Reset the position of the main element when the sidebar is closed
      this.renderer.setStyle(document.body, 'margin-left', '0px');
      this.renderer.setStyle(document.body, 'transition-timing-function', 'ease');
      this.renderer.setStyle(document.body, 'transition-property', 'all');
      this.renderer.setStyle(document.body, 'transition-duration', '0.4s');
    }
  }

  dropdown(event:any){
    const id = event.target.closest('li').id;
    const ulElement = this.el.nativeElement.querySelector(`.item-show-${id}`) as HTMLElement;
    const spanElement = event.target.querySelector('span') as HTMLElement;
    spanElement?.classList?.toggle('rotate');
    ulElement?.classList?.toggle('close-dropdown');
  }

  getUsername(){
    return this.authenticationService.getToken('username');
  }
}
