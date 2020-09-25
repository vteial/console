import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {auth} from "firebase";
import {AppSession} from "../@model/app-session";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  appSession: AppSession = null;
  appSession$: BehaviorSubject<AppSession>;

  private fbAuthState: Observable<firebase.User>;

  private fbUserDetail: firebase.User = null;

  constructor(private _auth: AngularFireAuth, private _router: Router) {
    this.appSession$ = new BehaviorSubject<AppSession>(this.appSession);

    this.fbAuthState = _auth.authState;
    this.fbAuthState.subscribe(
      (user) => {
        if (user) {
          this.fbUserDetail = user;
          // console.log(this.fbUserDetail);
          this.appSession = new AppSession(this.fbUserDetail);
        } else {
          this.fbUserDetail = null;
          this.appSession = null;
        }
        console.log(this.appSession);
        this.appSession$.next(this.appSession);
      }
    );
  }

  signInWithGoogle() {
    return this._auth.signInWithPopup(
      new auth.GoogleAuthProvider()
    )
  }

  isLoggedIn(): boolean {
    return this.fbUserDetail !== null
  }

  signOut(): void {
    this._auth.signOut().then((res) => this._router.navigate(['/index']));
  }
}
