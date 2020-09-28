import {environment} from "../../environments/environment";

export abstract class BaseComponent {

  envMode: string = environment.mode;

  viewName: string;

  protected constructor() {
  }

}
