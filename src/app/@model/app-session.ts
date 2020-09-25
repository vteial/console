import * as firebase from "firebase";

export class AppSession {

  id: string;

  roleId: string;

  userId: string;

  name: string;

  email: string;

  mobile: string;

  avatarUrl: string;

  fbUserDetail: firebase.User = null;

  constructor(sobj: firebase.User) {
    this.fbUserDetail = sobj;
    this.id = sobj.uid;

    this.roleId = 'admin';
    this.userId = sobj.email;
    this.name = sobj.displayName;
    this.email = sobj.email || '-';
    this.mobile = sobj.phoneNumber;
    this.avatarUrl = sobj.photoURL;
  }
}
