import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { EnableUserRequest } from 'src/app/model/request/enable-user-request';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-enable-user',
  templateUrl: './enable-user.component.html',
  styleUrls: ['./enable-user.component.css']
})
export class EnableUserComponent implements OnInit, OnDestroy {
  email: string;
  otp: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private toast: NgToastService,
    private router: Router
  ){
    this.email = "";
    this.otp = "";
  }
  
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.email = params['email'];
        this.otp = params['otp'];
      }
    )
    this.enableUser();
  }

  ngOnDestroy(): void {
    
  }

  private enableUser(){
    const enableUserRequest: EnableUserRequest = {
      email : this.email,
      otp : this.otp
    }
    this.authenticationService.enableUser(enableUserRequest).subscribe(
      (response)=>{
        this.toast.success({detail:"SUCCESS", summary:response.message, duration:5000});
        this.router.navigateByUrl('home');
      },
      (error)=>{
        this.toast.error({detail:"ERROR", summary:error?.error?.error, duration:5000});
      }
    );
  }
}
