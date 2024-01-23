import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { SearchUserResponse } from 'src/app/model/response/search-user-response';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent {
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
    this.following();
  }

  following(){
    const params = new HttpParams().set('username',this.username);
    this.userService.followingList(params).subscribe(
      (response)=>{
        this.userList = response;
      },
      (error)=>{
        this.toast.error({detail:"ERROR", summary:error?.error?.error, duration:5000});
      }
    )
  }
}
