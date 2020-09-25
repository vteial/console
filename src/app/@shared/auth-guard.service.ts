import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private auth: AuthService,
              private router: Router) { }

  canActivate() {
    if (this.auth.isLoggedIn() ) {
      return true;
    }
    this.router.navigateByUrl('/index');
    return false;
  }
}
