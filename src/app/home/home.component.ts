import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../@shared/base.component';
import {ApiService} from '../@shared/api.service';
import {AuthService} from "../@shared/auth.service";
import {AppSession} from "../@model/app-session";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit {

  item: AppSession;

  constructor(private auth: AuthService,
              private api: ApiService) {
    super();
    super.viewName = 'Home';
  }

  ngOnInit(): void {
    this.item = this.auth.appSession;
  }

}
