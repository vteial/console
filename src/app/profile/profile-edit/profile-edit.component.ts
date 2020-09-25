import Swal from 'sweetalert2';
import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {FormGroup} from '@angular/forms';
import {RxFormBuilder} from '@rxweb/reactive-form-validators';
import {Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {BaseComponent} from '../../@shared/base.component';
import {User} from '../../@model/user';
import {ApiService} from '../../@shared/api.service';
import {AppSession} from "../../@model/app-session";
import {AuthService} from "../../@shared/auth.service";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent extends BaseComponent implements OnInit {

  item: AppSession;
  itemFg: FormGroup;

  profileImageUrl: string;

  constructor(private auth: AuthService,
              private toastr: ToastrService,
              private router: Router,
              private formBuilder: RxFormBuilder) {
    super();
    super.viewName = 'Edit Profile';
  }

  ngOnInit(): void {
    this.item = this.auth.appSession;
  }

}
