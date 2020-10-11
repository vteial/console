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

  appSession$: BehaviorSubject<string>;

  appSession: AppSession = null;

  private fbAuthState: Observable<firebase.User>;

  private fbUserDetail: firebase.User = null;

  constructor(private fbAuth: AngularFireAuth,
              private api: ApiService,
              private router: Router,
              private ngZone: NgZone) {
    this.appSession$ = new BehaviorSubject<string>(null);

    this.fbAuthState = fbAuth.authState;
    this.fbAuthState.subscribe(
      (user) => {
        let message = null;
        if (user) {
          if (user.emailVerified) {
            this.fbUserDetail = user;
            this.appSession = new AppSession(this.fbUserDetail);
            this.syncUser();
          } else {
            this.fbUserDetail = null;
            this.appSession = null;
            message = 'Your email account is not yet verified. Please verify it.'
            this.signOut();
          }
        } else {
          this.fbUserDetail = null;
          this.appSession = null;
        }
        console.log(this.appSession);
        this.appSession$.next(message);
      }
    );
  }

  private syncUser(): void {
    this.api.fetchUserById(this.appSession.appUser.id).subscribe(res => {
      console.log(`isExists(${this.appSession.appUser.id}) : ${res.exists}`);
      const now = new Date(), model = this.appSession.appUser;
      if (res.exists) {
        Object.assign(model, res.data());
        if (!model.photoUrl) {
          model.photoUrl = 'assets/images/avatar_2x.png';
          model.preUpdate(model.id, now);
          this.api.updateUser(model).catch(error => console.log(error));
        }
      } else {
        model.status = UserStatus.ACTIVE;
        model.preCreate(model.id, now);
        this.api.createOrUpdateUser(model).catch(error => console.log(error));
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
    return this.fbAuth.createUserWithEmailAndPassword(user.userId, user.password);
  }

  async sendVerificationEmail() {
    const user = await this.fbAuth.currentUser;
    const acs = {
      url: `${window.location.origin}/sign-in`,
      handleCodeInApp: true
    };
    return user.sendEmailVerification(acs);
    // this.fbAuth.currentUser.then(res => {
    //   res.sendEmailVerification();
    // }).catch(error => {
    //   console.log(error);
    // });
  }

  sendResetPasswordEmail(emaiId: string) {
    const acs = {
      url: `${window.location.origin}/reset-password`,
      handleCodeInApp: true
    };
    return this.fbAuth.sendPasswordResetEmail(emaiId, acs);
  }

  applyActionCode(code: string) {
    return this.fbAuth.applyActionCode(code);
  }

  getErrorMessage(errorCode: string): string {

    let message: string;

    switch (errorCode) {
      case 'auth/argument-error':
        message = 'Invalid login credentials.';
        break;
      case 'auth/invalid-email':
        message = 'The email address is not a valid email address!';
        break;
      case 'auth/wrong-password':
        message = 'Invalid login credentials.';
        break;
      case 'auth/network-request-failed':
        message = 'Please check your internet connection';
        break;
      case 'auth/too-many-requests':
        message =
          'We have detected too many requests from your device. Take a break please!';
        break;
      case 'auth/user-disabled':
        message =
          'Your account has been disabled or deleted. Please contact the system administrator.';
        break;
      case 'auth/requires-recent-login':
        message = 'Please login again and try again!';
        break;
      case 'auth/email-already-exists':
        message = 'Email address is already in use by an existing user.';
        break;
      case 'auth/user-not-found':
        message =
          'We could not find user account associated with the email address or phone number.';
        break;
      case 'auth/phone-number-already-exists':
        message = 'The phone number is already in use by an existing user.';
        break;
      case 'auth/invalid-phone-number':
        message = 'The phone number is not a valid phone number!';
        break;
      case 'auth/cannot-delete-own-user-account':
        message = 'You cannot delete your own user account.';
        break;
      default:
        message = 'Oops! Something went wrong. Try again later.';
        break;
    }

    return message;
  }
}
