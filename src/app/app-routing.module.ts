import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from "./not-found/not-found.component";
import {WorkbenchComponent} from "./workbench/workbench.component";
import {IndexComponent} from "./index/index.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignOutComponent} from "./sign-out/sign-out.component";
import {HomeComponent} from "./home/home.component";
import {UserEditComponent} from "./user/user-edit/user-edit.component";
import {UserListComponent} from "./user/user-list/user-list.component";
import {UserViewComponent} from "./user/user-view/user-view.component";
import {ProfileComponent} from "./profile/profile.component";
import {ProfileEditComponent} from "./profile/profile-edit/profile-edit.component";
import {AuthGuardService} from "./@shared/auth-guard.service";

const routes: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {path: 'index', component: IndexComponent},

  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'profile-edit', component: ProfileEditComponent, canActivate: [AuthGuardService]},
  {path: 'user-list', component: UserListComponent, canActivate: [AuthGuardService]},
  {path: 'user-list/:id/view', component: UserViewComponent, canActivate: [AuthGuardService]},
  {path: 'user-list/:id/edit', component: UserEditComponent, canActivate: [AuthGuardService]},

  {path: 'sign-out', component: SignOutComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'workbench', component: WorkbenchComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
