import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { PostResponse } from 'src/app/model/response/post-response';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  private id: number;
  public post?: PostResponse;
  public isLiked: boolean = false;
  public showFlash: boolean = false;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private toast: NgToastService
  ) {
    this.id = 0;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.id = params['id'];
        this.getPost();
      }
    )
  }

  private getPost(){
    this.postService.getPostById(this.id).subscribe(
      (response)=>{
        this.post = response;
        this.isLiked = this.post?.likedByCurrentUser!;
      },
      (error)=>{
        this.toast.error({detail:"ERROR", summary:error?.error?.error, duration:5000});
      }
    );
  }

  toggleLike() {
    const params = new HttpParams().set('postId',this.post?.id!);
    if(!this.isLiked){
      this.showFlash = true;
      setTimeout(() => {
        this.showFlash = false;
      }, 1300);
      this.postService.likePost(params).subscribe(
        (response)=>{

        },
        (error)=>{
          this.toast.error({detail:"ERROR", summary:error?.error?.error, duration:5000});
        }
      );
    }else{
      this.postService.unlikePost(params).subscribe(
        (response)=>{

        },
        (error)=>{
          this.toast.error({detail:"ERROR", summary:error?.error?.error, duration:5000});
        }
      );
    }
    this.isLiked = !this.isLiked;
  }
}
