import * as firebase from "firebase";
import {User} from "./user";

export class AppSession {

  appUser: User = null;

  fbUser: firebase.User = null;

  constructor(sobj: firebase.User) {
    this.fbUser = sobj;

    const auser = new User();
    auser.id = sobj.uid;
    auser.userId = sobj.email;
    auser.name = sobj.displayName;
    auser.email = sobj.email;
    auser.mobile = sobj.phoneNumber;
    auser.photoUrl = sobj.photoURL;
    auser.emailVerified = sobj.emailVerified;

    this.appUser = auser;
  }

  // asSessionUserIdName(): string {
  //   return `${this.appUser.id}|${this.appUser.name}`;
  // }

}
