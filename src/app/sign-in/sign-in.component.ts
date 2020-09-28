import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {BaseComponent} from '../@shared/base.component';
import {AuthService} from "../@shared/auth.service";
import {User} from "../@model/user";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent extends BaseComponent implements OnInit {

  message: string;
  item: User;

  constructor(private auth: AuthService,
              private router: Router,
              private toastr: ToastrService) {
    super();
    super.viewName = 'Sign In';
  }

  ngOnInit(): void {
    // console.log(this.auth.appSession);
    // console.log('isLoggedIn : ' + this.auth.isLoggedIn());
    if (this.auth.isLoggedIn()) {
      this.toastr.info('You are already signed in...');
      this.router.navigate(['home']);
    } else {
      this.item = new User();
    }
  }

  signIn(): void {
    this.message = undefined;
    this.auth.signIn(this.item)
      .then(res => this.handleSuccess(res.user))
      .catch(err => {
        this.message = 'Sign In failed. Invalid email or password.';
        this.toastr.error(this.message);
        console.log(err)
      });
  }

  signInWithGoogle(): void {
    this.message = undefined;
    this.auth.signInWithGoogle()
      .then(res => this.handleSuccess(res.user))
      .catch(err => {
        this.message = 'Sign In failed. Invalid email or password.';
        this.toastr.error(this.message);
        console.log(err)
      });
  }

  signInWithFacebook(): void {
    this.message = undefined;
    this.toastr.info('This feature will come soon...');
  }

  signInWithTwitter(): void {
    this.message = undefined;
    this.toastr.info('This feature will come soon...');
  }

  private handleSuccess(auser: firebase.User): void {
    // this.auth.createUser(auser);
    // this.auth.createUser(auser)
    //   .catch(error => console.log(error))
    //   .finally( () => this.router.navigate(['home']));
    this.router.navigate(['home']);
  }
}
