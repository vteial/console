import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {BaseComponent} from "./@shared/base.component";
import {ReactiveFormConfig} from "@rxweb/reactive-form-validators";
import {AuthService} from "./@shared/auth.service";
import {AppSession} from "./@model/app-session";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  appTitle = 'Console';

  appDescription = 'System Console Application';

  currentViewName = 'Home';

  sideBarClass = '';

  appSession: AppSession;

  constructor(private cdr: ChangeDetectorRef,
              private auth: AuthService,
              private router: Router,
              private toastr: ToastrService) {
    ReactiveFormConfig.set({
      validationMessage: {
        required: 'This field is required.',
        alpha: 'This should have only alphabets and spaces.',
        minLength: 'This should have minimum of {{0}} characters.',
        password: 'This should satisfy the above condition.',
        compare: 'This should match with another field'
      }
    });
    this.auth.appSession$.subscribe(msg => {
      this.appSession = this.auth.appSession;
      if (msg) {
        this.toastr.warning(msg);
        this.router.navigate(['sign-in']);
      }
    });
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  onActivate(baseComponent: BaseComponent): void {
    this.currentViewName = baseComponent.viewName;
  }

  toggleClass(): void {
    this.sideBarClass = this.sideBarClass === 'active' ? '' : 'active';
  }

}
