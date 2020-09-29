import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../@shared/auth.service";
import {BaseComponent} from "../@shared/base.component";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent extends BaseComponent implements OnInit {

  constructor(private auth: AuthService,
              private router: Router,
              private toastr: ToastrService) {
    super();
    super.viewName = 'Sign Up';
  }

  ngOnInit(): void {
  }

}
