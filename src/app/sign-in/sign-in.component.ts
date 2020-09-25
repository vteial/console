import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ApiService} from '../@shared/api.service';
import {BaseComponent} from '../@shared/base.component';
import {AuthService} from "../@shared/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent extends BaseComponent implements OnInit {

  constructor(private auth: AuthService,
              private router: Router,
              private api: ApiService,
              private toastr: ToastrService) {
    super();
    super.viewName = 'Sign In';
  }

  ngOnInit(): void {
    // console.log(this.auth.appSession);
    // console.log('isLoggedIn : ' + this.auth.isLoggedIn());
    if (this.auth.isLoggedIn()) {
      this.toastr.info('You are already signed in...');
      this.goToHome();
    }
  }

  signIn(): void {
    this.auth.signInWithGoogle().then(res => this.goToHome()).catch(err => console.log(err));
  }

  private goToHome(): void {
    this.router.navigate(['home']);
    // this.router.navigateByUrl('/home').finally(() => {});
  }
}
