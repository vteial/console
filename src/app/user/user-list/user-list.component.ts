import { Component, OnInit } from '@angular/core';
import {BaseComponent} from "../../@shared/base.component";
import {ApiService} from "../../@shared/api.service";
import {ToastrService} from "ngx-toastr";
import {User} from "../../@model/user";
import {LocalStorageService} from "ngx-webstorage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends BaseComponent implements OnInit {

  items: Array<User>;

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
    // this.api.fetchUsers().subscribe((data) => {
    //   this.items = data;
    // });
  }

  view(item: User): void {
    this.storage.store(User.KEY, item);
    this.router.navigateByUrl('user-list/' + item.id + '/view')
      .finally(() => {});
  }

}
