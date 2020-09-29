import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {BaseComponent} from "../@shared/base.component";
import {AuthService} from "../@shared/auth.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent extends BaseComponent implements OnInit {

  constructor(private auth: AuthService,
              private router: Router,
              private toastr: ToastrService) {
    super();
    super.viewName = 'Reset Password';
  }

  ngOnInit(): void {
  }

}
