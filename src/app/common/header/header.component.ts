import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private isClicked = true;

  constructor (
    private renderer: Renderer2
  ){
  }

  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'margin-left', '250px');
    // this.renderer.setStyle(document.body, 'transition-timing-function', 'ease');
    // this.renderer.setStyle(document.body, 'transition-property', 'all');
    // this.renderer.setStyle(document.body, 'transition-duration', '0.4s');
  }

  onLeftNavClick(isClicked: boolean) {
    this.isClicked = isClicked;
  }

  getIsClicked(){
    return this.isClicked;
  }
}
