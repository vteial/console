import {environment} from "../../environments/environment";
import {AppSession} from "../@model/app-session";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {LocalStorageService} from "ngx-webstorage";

export abstract class BaseComponent {

  envMode: string = environment.mode;

  viewName: string;

  // protected appSession: AppSession;
  //
  // protected router: Router;
  //
  // protected toastr: ToastrService;
  //
  // protected storage: LocalStorageService;

  protected constructor() {
  }

}
