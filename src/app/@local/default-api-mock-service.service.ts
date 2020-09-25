import {ApiMockDataCallback, ApiMockRootRoute, ApiMockService} from "@ng-stack/api-mock";
import { nanoid } from 'nanoid'
import {User} from "../@model/user";

export class DefaultApiMockServiceService implements ApiMockService {

  private users: Array<User>;

  constructor() {
    this.users = new Array<User>()
    let model = new User();
    model.id = nanoid();
    model.userId = 'sadmin';
    model.password = '1';
    model.name = 'Super Admin';
    model.email = 'sadmin@localhost.com';
    model.mobile = '0123456789';
    model.status = 'active';
    model.createdBy = model.id;
    let now = new Date();
    model.createdTime = now;
    model.updatedBy = model.id
    model.updatedTime = now;
    this.users.push(model);
  }

  getRoutes(): ApiMockRootRoute[] {
    return [
      {
        path: 'api/sign-in',
        responseCallback: () => ({ message: 'OK' })
      },
      {
        path: 'api/session',
        responseCallback: () => ({ message: 'OK' })
      },
      {
        path: 'api/sign-out',
        responseCallback: () => ({ message: 'OK' })
      },
      {
        path: 'api/users/:id',
        dataCallback: this.getUserCallback(),
      },
    ];
  }

  private getUserCallback(): ApiMockDataCallback<User[]> {
    return ({ httpMethod, items }) => {
      console.log(items);
      if (httpMethod == 'GET') {
        return this.users;
      } else {
        return items;
      }
    };
  }

}
