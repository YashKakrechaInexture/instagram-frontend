import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { SearchUserResponse } from 'src/app/model/response/search-user-response';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  username: string;
  userList: SearchUserResponse[];

  constructor(
    private userService: UserService,
    private toast: NgToastService
  ){
    this.username = "";
    this.userList = [];
  }

  findUser(){
    const params = new HttpParams().set('username', this.username);
    this.userService.searchUser(params).subscribe(
      (response)=>{
        this.userList = response;
      },
      (error)=>{
        this.toast.error({detail:"ERROR", summary:error?.error?.error, duration:5000});
      }
    );
  }
}
