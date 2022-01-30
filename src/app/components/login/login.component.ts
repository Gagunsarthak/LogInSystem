import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  constructor(private authService: AuthService,private router:Router) {}

  ngOnInit(): void {
    this.loginForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  login(): void {
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(data=>{console.log("The data is",data,
      localStorage.setItem("token", data.token),
            this.isUserLoggedIn$.next(true),
            console.log("Navigating to routes"),
            this.router.navigate(["posts"]),
      )},err=>{console.log("the error is ",err)});
  }
}
