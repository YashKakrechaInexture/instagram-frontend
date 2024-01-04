import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { UserProfile } from 'src/app/model/response/user-profile';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  public userProfile?: UserProfile;

  constructor(
    private userService: UserService,
    private toast: NgToastService
  ){
    userService.getProfile().subscribe(
      (response)=>{
        this.userProfile = response;
      },
      (error)=>{
        this.toast.error({detail:"ERROR", summary:error?.error?.error, duration:5000});
      }
    );
  }
}
