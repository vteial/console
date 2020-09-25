import { Component, OnInit } from '@angular/core';
import {ApiService} from '../@shared/api.service';
import {Router} from '@angular/router';
import {BaseComponent} from '../@shared/base.component';
import {AuthService} from "../@shared/auth.service";

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent extends BaseComponent implements OnInit {

  constructor(private auth: AuthService,
              private router: Router,
              private apiService: ApiService) {
    super();
    super.viewName = 'Sign Out';
  }

  ngOnInit(): void {
    this.signOut();
  }

  signOut(): void {
    this.auth.signOut();
    console.log('sign out triggered...');
    this.router.navigateByUrl('/index').finally(() => {});
  }

}
