import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../@shared/auth.service";
import {BaseComponent} from "../@shared/base.component";
import {User} from "../@model/user";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent extends BaseComponent implements OnInit {

  message: string;

  item: User;

  constructor(private auth: AuthService,
              private router: Router,
              private toastr: ToastrService) {
    super();
    super.viewName = 'Sign Up';
  }

  ngOnInit(): void {
    this.item = new User();
  }

  signUp(): void {
    this.message = undefined;
    this.auth.signUp(this.item)
      .then(res => {
        this.toastr.info('Signed up successfully..');
        this.sendVerificationEmail();
      })
      .catch(err => {
        this.message = err.message;
        this.toastr.error(this.message);
        console.log(err)
      });
  }

  private sendVerificationEmail(): void {
    try {
      this.auth.sendVerificationEmail()
        .then(res => {
          this.toastr.info('Verification email sent. Please confirm it.');
          this.item = new User();
        })
        .catch(err => {
          this.message = 'Sending verification email failed...';
          this.toastr.error(this.message);
          console.log(err);
        });
    } catch(error) {
      console.log(error);
    }
  }
}
