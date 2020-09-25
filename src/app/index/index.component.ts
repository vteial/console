import { Component, OnInit } from '@angular/core';
import {BaseComponent} from "../@shared/base.component";
import {AppSession} from "../@model/app-session";
import {AuthService} from "../@shared/auth.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent extends BaseComponent implements OnInit {

  item: AppSession;

  constructor(private auth: AuthService) {
    super();
    super.viewName = 'Home';
  }

  ngOnInit(): void {
    this.item = this.auth.appSession;
  }

}
