import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/model/request/login-request';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  email: String;
  password: String;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ){
    this.email = "";
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
    if(this.email===""){
      // this.toast.error({detail:"ERROR", summary:'Please Enter Your Email!', duration:5000});
      return;
    }
    if(this.password===""){
      // this.toast.error({detail:"ERROR", summary:'Please Enter Your Password!', duration:5000});
      return;
    }
    const loginRequest: LoginRequest = {
      email : this.email,
      password : this.password
    }
    this.authenticate(loginRequest);
  }

  private authenticate(loginRequest : LoginRequest){
    this.authenticationService.authenticate(loginRequest).subscribe(
      (response)=>{
        this.authenticationService.setToken(response.token.toString());
        this.router.navigateByUrl('home');
      },
      (error)=>{
        // this.toast.error({detail:"ERROR", summary:error?.error?.error, duration:5000});
      }
    );
  }
}
