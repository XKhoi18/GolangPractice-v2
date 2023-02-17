import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent {
  constructor(private sharedService: SharedService,private router: Router) {}
  username : string ="";
  password : string ="";
  show: boolean= false;
  logInCheck: LogInCheck = new LogInCheck;
  
  submit(){
    this.sharedService.logInCheck(this.username,this.password).subscribe(response => {
      this.logInCheck = response;
      if (this.logInCheck.LoginStatus == "Login Success") {
        sessionStorage.setItem("username", this.username);
        sessionStorage.setItem("role", this.logInCheck.Role!);
        if (this.logInCheck.Role == "admin"){
          // this.router.navigateByUrl("/product");
          window.location.href= "/product";
        } else {
          // this.router.navigate(["/homepage"]);
          window.location.href= "/homepage";
        }
      } else {
        this.show = true;
      }
    });
  }

  // clear(){
  //   this.username ="";
  //   this.password = "";
  // }
}

export class LogInCheck {
  LoginStatus?: string
  Role?: string
}