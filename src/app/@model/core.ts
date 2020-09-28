import {HttpParams} from "@angular/common/http";
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export abstract class Model {

  id: string;

  createdBy: string;

  createdTime: number;

  // createdTimeX: Timestamp;

  updatedBy: string;

  updatedTime: number;

  // updatedTimeX: Timestamp;

  protected constructor() {
  }

  preCreate(userIdName: string, time: Date): void {
    this.createdBy = userIdName;
    this.createdTime = time.getTime();
    this.updatedBy = this.createdBy;
    this.updatedTime = this.createdTime;
    // this.createdTimeX = Timestamp.fromDate(time);
    // this.updatedTimeX = this.createdTimeX;
  }

  preUpdate(userIdName: string, time: Date): void {
    this.updatedBy = userIdName;
    this.updatedTime = time.getTime();
    // this.updatedTimeX = Timestamp.fromDate(time);
  }

  asHttpParams(): HttpParams {
    let httpParams = new HttpParams();
    if (this.id) {
      httpParams = httpParams.set('id', '' + this.id);
    }
    return httpParams;
  }

  asHttpParamsString(): string {
    let pstring = this.asHttpParams().toString();
    if (pstring && pstring.length > 0) {
      pstring = '?' + pstring;
    }
    return pstring;
  }
}
