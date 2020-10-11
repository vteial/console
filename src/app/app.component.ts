import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BaseComponent} from "./@shared/base.component";
import {ReactiveFormConfig} from "@rxweb/reactive-form-validators";
import {AuthService} from "./@shared/auth.service";
import {AppSession} from "./@model/app-session";
import {ToastrService} from "ngx-toastr";
import {NavigationEnd, Router} from "@angular/router";
import {LocalStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  appTitle = 'Console';

  appDescription = 'System Console Application';

  currentViewName = 'Home';

  sideBarClass = '';

  appSession: AppSession;

  constructor(private cdr: ChangeDetectorRef,
              private auth: AuthService,
              private router: Router,
              private toastr: ToastrService,
              private storage: LocalStorageService) {
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
      } else {
        const currentPath = this.storage.retrieve('currentPath');
        if (currentPath) {
          this.router.navigateByUrl(currentPath);
        }
      }
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      // if (event instanceof NavigationStart) {
      // }
      if (event instanceof NavigationEnd) {
        if(this.appSession) {
          // console.log(event);
          this.storage.store('currentPath', event.url);
        } else {
          if (event.url === '/cart') {
            this.storage.store('currentPath', event.url);
          }
        }
      }
      // if (event instanceof NavigationError) {
      //   console.log(event.error);
      // }
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
