import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { PostResponse } from 'src/app/model/response/post-response';
import { UserProfile } from 'src/app/model/response/user-profile';
import { FollowService } from 'src/app/service/follow.service';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userProfile?: UserProfile;
  public posts?: PostResponse[];
  private username: string

  constructor(
    private userService: UserService,
    private postService: PostService,
    private toast: NgToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private followService: FollowService
  ){
    this.username = "";
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.username = params['username'];
        this.setProfile();
        this.getPostsList();
      }
    )
  }

  public setProfile(){
    const params = new HttpParams().set('username',this.username);
    this.userService.getProfile(params).subscribe(
      (response)=>{
        this.userProfile = response;
      },
      (error)=>{
        this.toast.error({detail:"ERROR", summary:error?.error?.error, duration:5000});
      }
    );
  }

  public onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.uploadFile(file);
    }
  }

  private uploadFile(file: File): void {
    const formData: FormData = new FormData();
    formData.append('profile-pic', file, file.name);

    this.userService.updateProfilePic(formData).subscribe(
      (response) => {
        this.setProfile();
      },
      (error) => {
        this.toast.error({detail:"ERROR", summary:error?.error?.error, duration:5000});
      }
    );
  }

  private getPostsList(){
    const params = new HttpParams().set('username',this.username);
    this.postService.getAllPostsByUsername(params).subscribe(
      (response)=>{
        this.posts = response;
      },
      (error)=>{
        this.toast.error({detail:"ERROR", summary:error?.error?.error, duration:5000});
      }
    );
  }

  followUser(){
    const params = new HttpParams().set('followUsername',this.userProfile?.username!);
    this.followService.followUser(params).subscribe(
      (response)=>{
        this.toast.success({detail:"SUCCESS", summary:response.message, duration:5000});
        this.userProfile!.followedThisUser = true;
      },
      (error)=>{
        this.toast.error({detail:"ERROR", summary:error?.error?.error, duration:5000});
      }
    )
  }

  unfollowUser(){
    const params = new HttpParams().set('followUsername',this.userProfile?.username!);
    this.followService.unfollowUser(params).subscribe(
      (response)=>{
        this.toast.success({detail:"SUCCESS", summary:response.message, duration:5000});
        this.userProfile!.followedThisUser = false;
      },
      (error)=>{
        this.toast.error({detail:"ERROR", summary:error?.error?.error, duration:5000});
      }
    )
  }

  followers(){
    this.router.navigateByUrl('profile/' + this.username + '/followers');
  }

  following(){
    this.router.navigateByUrl('profile/' + this.username + '/following');
  }

  postView(id: number){
    this.router.navigateByUrl('post/' + id);
  }
}
