import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {ClipboardModule} from 'ngx-clipboard';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {ToastrModule} from 'ngx-toastr';
import {NgxPrettyCheckboxModule} from 'ngx-pretty-checkbox';
import {ModalModule} from 'ngx-bootstrap/modal';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';

import {AngularFireModule} from "@angular/fire";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFirestoreModule} from "@angular/fire/firestore";

import {environment} from "../environments/environment";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {JsonViewerComponent} from "./common/json-viewer/json-viewer.component";
import {WorkbenchComponent} from "./workbench/workbench.component";
import {IndexComponent} from './index/index.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignOutComponent} from "./sign-out/sign-out.component";
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from "./profile/profile.component";
import {ProfileEditComponent} from "./profile/profile-edit/profile-edit.component";
import {UserListComponent} from './user/user-list/user-list.component';
import {UserEditComponent} from './user/user-edit/user-edit.component';
import {UserViewComponent} from './user/user-view/user-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    JsonViewerComponent,
    WorkbenchComponent,
    IndexComponent,
    SignUpComponent,
    SignInComponent,
    SignOutComponent,
    ResetPasswordComponent,
    HomeComponent,
    ProfileComponent,
    ProfileEditComponent,
    UserListComponent,
    UserEditComponent,
    UserViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    ClipboardModule,
    NgxWebstorageModule.forRoot(),
    SweetAlert2Module.forRoot(),
    NgxPrettyCheckboxModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
