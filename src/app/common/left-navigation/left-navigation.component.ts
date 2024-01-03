import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-left-navigation',
  templateUrl: './left-navigation.component.html',
  styleUrls: ['./left-navigation.component.css']
})
export class LeftNavigationComponent implements OnInit {
  isTodoVisible: boolean;
  isUserVisible: boolean;
  @Input() isClicked = true;

  // onLeftNavClicked(event: boolean) {
  //   this.isClicked = event;
  // }

  constructor(
    private authenticationService : AuthenticationService,
    private router : Router
  ){
    this.isTodoVisible = false;
    this.isUserVisible = false;
  }
  ngOnInit(){
    this.isClicked = true;
  }

  public logout(){
    this.authenticationService.logout();
    this.router.navigateByUrl('');
  }

  public todoVisibilityToggle(){
    this.isTodoVisible = !this.isTodoVisible;
  }

  public userVisibilityToggle(){
    this.isUserVisible = !this.isUserVisible;
  }
}
