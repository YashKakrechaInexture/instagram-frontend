import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserProfile } from 'src/app/model/response/user-profile';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userProfile?: UserProfile;
  private username?: String

  constructor(
    private userService: UserService,
    private toast: NgToastService,
    private activatedRoute: ActivatedRoute
  ){
    
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.username = params['username'];
      }
    )
    this.setProfile();
  }

  public setProfile(){
    this.userService.getProfile().subscribe(
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

    this.userService.updateProfilePic(formData)
      .subscribe(
        (response) => {
          this.setProfile();
        },
        (error) => {
          this.toast.error({detail:"ERROR", summary:error?.error?.error, duration:5000});
        }
      );
  }
}
