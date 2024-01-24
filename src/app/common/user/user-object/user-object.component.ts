import { HttpParams } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { SearchUserResponse } from 'src/app/model/response/search-user-response';
import { FollowService } from 'src/app/service/follow.service';

@Component({
  selector: 'app-user-object',
  templateUrl: './user-object.component.html',
  styleUrls: ['./user-object.component.css']
})
export class UserObjectComponent {
  @Input()
  user!: SearchUserResponse;

  constructor(
    private followService: FollowService,
    private toast: NgToastService,
    private router: Router
  ){

  }

  followUser(searchUserResponse: SearchUserResponse){
    const params = new HttpParams().set('followUsername',searchUserResponse.username!);
    this.followService.followUser(params).subscribe(
      (response)=>{
        this.toast.success({detail:"SUCCESS", summary:response.message, duration:5000});
        searchUserResponse.following = true;
      },
      (error)=>{
        this.toast.error({detail:"ERROR", summary:error?.error?.error, duration:5000});
      }
    )
  }

  unfollowUser(searchUserResponse: SearchUserResponse){
    const params = new HttpParams().set('followUsername',searchUserResponse.username!);
    this.followService.unfollowUser(params).subscribe(
      (response)=>{
        this.toast.success({detail:"SUCCESS", summary:response.message, duration:5000});
        searchUserResponse.following = false;
      },
      (error)=>{
        this.toast.error({detail:"ERROR", summary:error?.error?.error, duration:5000});
      }
    )
  }

  goToProfile(){
    this.router.navigateByUrl('profile/'+this.user.username);
  }
}
