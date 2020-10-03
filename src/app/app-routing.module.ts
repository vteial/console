import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from "./not-found/not-found.component";
import {WorkbenchComponent} from "./workbench/workbench.component";
import {IndexComponent} from "./index/index.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignOutComponent} from "./sign-out/sign-out.component";
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {ProfileEditComponent} from "./profile/profile-edit/profile-edit.component";
import {UserListComponent} from "./user/user-list/user-list.component";
import {UserViewComponent} from "./user/user-view/user-view.component";
import {UserEditComponent} from "./user/user-edit/user-edit.component";
import {AuthGuardService} from "./@shared/auth-guard.service";
import {ProductListComponent} from "./product/product-list/product-list.component";
import {ProductEditComponent} from "./product/product-edit/product-edit.component";
import {ProductViewComponent} from "./product/product-view/product-view.component";

const routes: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {path: 'index', component: IndexComponent},

  {path: 'sign-up', component: SignUpComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-out', component: SignOutComponent},

  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'profile-edit', component: ProfileEditComponent, canActivate: [AuthGuardService]},

  {path: 'users', component: UserListComponent, canActivate: [AuthGuardService]},
  {path: 'users/:id/view', component: UserViewComponent, canActivate: [AuthGuardService]},
  {path: 'users/:id/edit', component: UserEditComponent, canActivate: [AuthGuardService]},

  {path: 'products', component: ProductListComponent, canActivate: [AuthGuardService]},
  {path: 'products/:id/add', component: ProductEditComponent, canActivate: [AuthGuardService]},
  {path: 'products/:id/view', component: ProductViewComponent, canActivate: [AuthGuardService]},
  {path: 'products/:id/edit', component: ProductEditComponent, canActivate: [AuthGuardService]},

  {path: 'workbench', component: WorkbenchComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
