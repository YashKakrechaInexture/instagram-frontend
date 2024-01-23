import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { SearchUserResponse } from 'src/app/model/response/search-user-response';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent {
  userList!: SearchUserResponse[];
  private username: string;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private toast: NgToastService
  ) {
    this.username = "";
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.username = params['username'];
      }
    )
    this.followers();
  }

  followers(){
    const params = new HttpParams().set('username',this.username);
    this.userService.followersList(params).subscribe(
      (response)=>{
        this.userList = response;
      },
      (error)=>{
        this.toast.error({detail:"ERROR", summary:error?.error?.error, duration:5000});
      }
    )
  }
}
