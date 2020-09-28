import { Component, OnInit } from '@angular/core';
import {BaseComponent} from "../../@shared/base.component";
import {ApiService} from "../../@shared/api.service";
import {ToastrService} from "ngx-toastr";
import {User} from "../../@model/user";
import {LocalStorageService} from "ngx-webstorage";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends BaseComponent implements OnInit {

  items: Observable<User[]>;

  constructor(private api: ApiService,
              private toastr: ToastrService,
              private router: Router,
              private storage: LocalStorageService) {
    super();
    super.viewName = 'Users';
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.items = this.api.fetchUsers();
  }

  view(item: User): void {
    this.storage.store(User.KEY, item);
    this.router.navigateByUrl('user-list/' + item.id + '/view');
  }

}
