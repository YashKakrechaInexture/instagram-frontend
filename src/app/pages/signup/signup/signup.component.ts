import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { SignupRequest } from 'src/app/model/request/signup-request';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  fullName: String;
  email: String;
  username: String;
  password: String;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private toast: NgToastService
  ){
    this.fullName = "";
    this.email = "";
    this.username = "";
    this.password = "";
  }
  ngOnInit(): void {
    if(this.authenticationService.isLoggedIn()){
      this.router.navigateByUrl('home');
    }
  }
  ngOnDestroy(): void {
    
  }

  public onSubmit(){
    if(this.fullName===""){
      this.toast.error({detail:"ERROR", summary:'Please Enter Your Full Name!', duration:5000});
      return;
    }
    if(this.email===""){
      this.toast.error({detail:"ERROR", summary:'Please Enter Your Email!', duration:5000});
      return;
    }
    if(this.username===""){
      this.toast.error({detail:"ERROR", summary:'Please Enter Your Username!', duration:5000});
      return;
    }
    if(this.password===""){
      this.toast.error({detail:"ERROR", summary:'Please Enter Your Password!', duration:5000});
      return;
    }
    const signupRequest: SignupRequest = {
      fullName : this.fullName,
      email : this.email,
      username : this.username,
      password : this.password
    }
    this.createUser(signupRequest);
  }

  private createUser(signupRequest : SignupRequest){
    this.authenticationService.signup(signupRequest).subscribe(
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
