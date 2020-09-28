import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {BsModalService} from 'ngx-bootstrap/modal';
import {AppSession} from "../@model/app-session";
import {ApiService} from '../@shared/api.service';
import {BaseComponent} from '../@shared/base.component';
import {AuthService} from "../@shared/auth.service";
import {User} from "../@model/user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends BaseComponent implements OnInit {

  item: User;

  constructor(private auth: AuthService,
              private toastr: ToastrService,
              private modalService: BsModalService) {
    super();
    super.viewName = 'Profile';
  }

  ngOnInit(): void {
    this.item = this.auth.appSession.appUser;
  }

}
