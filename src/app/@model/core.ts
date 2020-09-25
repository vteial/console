import {HttpParams} from "@angular/common/http";
import {User} from "./user";

export abstract class Model {

  id: string;

  createdBy: string;

  createdTime: Date;

  updatedBy: string;

  updatedTime: Date;

  protected constructor() {
  }

  abstract asHttpParams(): HttpParams;

  asHttpParamsString(): string {
    let pstring = this.asHttpParams().toString();
    if (pstring && pstring.length > 0) {
      pstring = '?' + pstring;
    }
    return pstring;
  }
}


export class UserDto {

  userId: string;

  password: string;

  constructor() {
  }

}
