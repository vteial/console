import {Injectable, NgZone} from '@angular/core';
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";
import {BehaviorSubject, Observable} from "rxjs";
import {auth} from "firebase";
import {AppSession} from "../@model/app-session";
import {User, UserStatus} from "../@model/user";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  appSession: AppSession = null;
  appSession$: BehaviorSubject<AppSession>;

  private fbAuthState: Observable<firebase.User>;

  private fbUserDetail: firebase.User = null;

  constructor(private fbAuth: AngularFireAuth,
              private api: ApiService,
              private router: Router,
              private ngZone: NgZone) {
    this.appSession$ = new BehaviorSubject<AppSession>(this.appSession);

    this.fbAuthState = fbAuth.authState;
    this.fbAuthState.subscribe(
      (user) => {
        if (user) {
          this.fbUserDetail = user;
          this.appSession = new AppSession(this.fbUserDetail);
          this.syncUser();
        } else {
          this.fbUserDetail = null;
          this.appSession = null;
        }
        console.log(this.appSession);
        this.appSession$.next(this.appSession);
      }
    );
  }

  private syncUser(): void {
    this.api.fetchUserById(this.appSession.appUser.id).subscribe(res => {
      // console.log(this.appSession.appUser);
      const now = new Date(), model = this.appSession.appUser;
      if (res.exists) {
        Object.assign(model, res.data());
        // model.status = UserStatus.ACTIVE;
        // model.preUpdate(model.id, now);
        // this.api.updateUser(model).catch(error => console.log(error));
      } else {
        model.status = UserStatus.ACTIVE;
        model.preCreate(model.id, now);
        this.api.createUser(model).catch(error => console.log(error));
      }
      console.log(model);
    });
  }

  signIn(user: User) {
    return this.fbAuth.signInWithEmailAndPassword(user.userId, user.password);
  }

  signInWithGoogle() {
    return this.fbAuth.signInWithPopup(new auth.GoogleAuthProvider())
  }

  signInWithFacebook() {
    return this.fbAuth.signInWithPopup(new auth.FacebookAuthProvider())
  }

  signInWithTwitter() {
    return this.fbAuth.signInWithPopup(new auth.TwitterAuthProvider())
  }

  isLoggedIn(): boolean {
    return this.fbUserDetail !== null
  }

  signOut(): void {
    this.fbAuth.signOut().then((res) => this.router.navigate(['/index']));
  }

  signUp(user: User) {
    return this.fbAuth.createUserWithEmailAndPassword(user.email, user.password);
  }

  sendVerificationEmail() {
    // TODO: send verification email
  }

  sendResetPasswordEmail(emaiId: string) {
    return this.fbAuth.sendPasswordResetEmail(emaiId);
  }
}
