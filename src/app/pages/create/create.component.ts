import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  caption: string;
  file?: File;

  constructor(
    private userService: UserService,
    private router: Router,
    private toast: NgToastService,
    private postService: PostService,
    private authenticationService: AuthenticationService
  ) {
    this.caption = "";
  }


  public onFileSelected(event: any): void {
    this.file = event.target.files[0];

    // if (file) {
    //   this.uploadFile(file);
    // }
  }

  public post(){
    if(!this.file){
      this.toast.error({detail:"ERROR", summary:'Image is Empty!', duration:5000});
      return;
    }
    if(this.caption===""){
      this.toast.error({detail:"ERROR", summary:'Caption is Empty!', duration:5000});
      return;
    }
    this.uploadPost();
  }

  private uploadPost(): void {
    const formData: FormData = new FormData();
    formData.append('post-pic', this.file!, this.file!.name);
    formData.append('caption', this.caption);

    this.postService.uploadPostPic(formData).subscribe(
      (response) => {
        this.router.navigateByUrl('profile/'+this.authenticationService.getToken('username'));
      },
      (error) => {
        this.toast.error({detail:"ERROR", summary:error?.error?.error, duration:5000});
      }
    );
  }
}
