import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../@shared/base.component";
import {AppSession} from "../@model/app-session";
import {AuthService} from "../@shared/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent extends BaseComponent implements OnInit {

  item: AppSession;

  action: string;

  message: string;

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,) {
    super();
    super.viewName = 'Home';
  }

  ngOnInit(): void {
    this.item = this.auth.appSession;
    // this.action = this.activatedRoute.snapshot.queryParams['mode'];
    // if(this.action === 'verifyEmail') {
    //   this.handleVerifyEmail();
    // }
  }

  private handleVerifyEmail(): void {
    const code = this.activatedRoute.snapshot.queryParams['oobCode'];
    this.auth.applyActionCode(code)
      .then(res => {
        this.toastr.info('You email has been verified...');
        this.router.navigateByUrl('/sign-in');
      })
      .catch(err => {
        this.message = this.auth.getErrorMessage(err.code);
        this.toastr.error(this.message);
      });
  }

}
