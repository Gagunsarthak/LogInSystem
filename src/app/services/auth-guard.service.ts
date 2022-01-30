import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    console.log("The userlogged in is ",this.authService.isUserLoggedIn$.value)
    if (!this.authService.isUserLoggedIn$.value) {
      this.router.navigate(["signup"]);
    }
    return this.authService.isUserLoggedIn$;
  }
}
