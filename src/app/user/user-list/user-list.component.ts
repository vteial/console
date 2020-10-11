import { Component, OnInit } from '@angular/core';
import {BaseComponent} from "../../@shared/base.component";
import {ApiService} from "../../@shared/api.service";
import {ToastrService} from "ngx-toastr";
import {User, UserRole} from "../../@model/user";
import {LocalStorageService} from "ngx-webstorage";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {AuthService} from "../../@shared/auth.service";
import {Product} from "../../@model/product";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends BaseComponent implements OnInit {

  userRole: string;

  items: Observable<User[]>;

  constructor(private auth: AuthService,
              private fbStore: AngularFirestore,
              private api: ApiService,
              private toastr: ToastrService,
              private router: Router,
              private storage: LocalStorageService) {
    super();
    super.viewName = 'Users';
  }

  ngOnInit(): void {
    this.userRole = UserRole.OWNER;
    this.refresh();
  }

  refresh(): void {
    // this.items = this.api.fetchUsers();
    this.items = this.fbStore.collection<User>(`/${User.KEY}`, ref => {
      let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      query = query.where('roleId', '==', this.userRole)
      query = query.orderBy('createdTime', 'desc')
      return query;
    }).valueChanges();
  }

  view(item: User): void {
    this.storage.store(User.KEY, item);
    this.router.navigateByUrl('user-list/' + item.id + '/view');
  }

  onUserRole(): void {
    console.log(`userRole : ${this.userRole}`);
    this.refresh();
  }
}
