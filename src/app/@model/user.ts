import {HttpParams} from '@angular/common/http';
import {prop, required} from '@rxweb/reactive-form-validators';
import {Model} from './core';

export class User extends Model {

  static KEY = 'wydUser';

  @required()
  name: string;

  @required()
  userId: string;

  @prop()
  password: string;

  @required()
  email: string;

  @required()
  mobile: string;

  addressId: number;

  status: string;

  constructor() {
    super();
  }

  asHttpParams(): HttpParams {
    let httpParams = new HttpParams();
    if (this.id) {
      httpParams = httpParams.set('id', '' + this.id);
    }
    return httpParams;
  }

}
