import {prop, required} from '@rxweb/reactive-form-validators';
import {Model} from './core';
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export enum UserStatus {
  DRAFT = 'draft',
  NEW = 'new',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DELETED = 'deleted',
}

export enum UserProvider {
  SELF = 'self',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
}

export class User extends Model {

  static KEY = 'users';

  @prop()
  userId: string;

  @prop()
  password: string;

  @required()
  name: string;

  @required()
  email: string;

  @required()
  mobile: string;

  @prop()
  photoUrl: string;

  emailVerified: boolean;

  @prop()
  idNumber: string;

  @prop()
  idNumberType: string;

  defaultAddressId: string;

  billingAddressId: string;

  @prop()
  roleId: string;

  providedBy: string

  status: string;

  // statusClazz: string;

  constructor() {
    super();
  }

  preCreate(userIdName: string, time: Date): void {
    super.preCreate(userIdName, time);
  }

  preUpdate(userIdName: string, time: Date): void {
    super.preUpdate(userIdName, time);
  }

  // compute(): void {
  //   if(this.status === undefined) {
  //     this.statusClazz = UserStatus.NEW;
  //     return;
  //   }
  //   switch (this.status) {
  //     case UserStatus.DRAFT:
  //       this.statusClazz = 'text-warning';
  //       break;
  //     case UserStatus.NEW:
  //       this.statusClazz = 'text-info';
  //       break;
  //     case UserStatus.ACTIVE:
  //       this.statusClazz = 'text-primary';
  //       break;
  //     case UserStatus.INACTIVE:
  //       this.statusClazz = 'text-danger';
  //       break;
  //     case UserStatus.DELETED:
  //       this.statusClazz = 'text-secondary';
  //       break;
  //     default:
  //       this.statusClazz = 'text-info';
  //       break;
  //   }
  // }
}
