import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../@shared/base.component";
import {User} from "../../@model/user";
import {ApiService} from "../../@shared/api.service";
import {ToastrService} from "ngx-toastr";
import {LocalStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent extends BaseComponent implements OnInit {

  item: User;

  constructor(private api: ApiService,
              private toastr: ToastrService,
              private storage: LocalStorageService) {
    super();
    super.viewName = 'User Detail';
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.item = this.storage.retrieve(User.KEY);
  }

}
