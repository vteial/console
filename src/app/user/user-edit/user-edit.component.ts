import { Component, OnInit } from '@angular/core';
import {BaseComponent} from "../../@shared/base.component";
import {User} from "../../@model/user";
import {ApiService} from "../../@shared/api.service";
import {ToastrService} from "ngx-toastr";
import {RxFormBuilder} from "@rxweb/reactive-form-validators";
import {FormGroup} from "@angular/forms";
import {LocalStorageService} from "ngx-webstorage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent extends BaseComponent implements OnInit {

  item: User;
  itemFg: FormGroup;

  constructor(private api: ApiService,
              private toastr: ToastrService,
              private router: Router,
              private storage: LocalStorageService,
              private formBuilder: RxFormBuilder) {
    super();
    super.viewName = 'Edit User';
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.item = this.storage.retrieve(User.KEY);
    this.itemFg = this.formBuilder.formGroup(this.item);
  }

  save(): void {
    console.log(this.itemFg);
    if (this.itemFg.invalid) {
      this.toastr.error('Please fix the error fields by providing valid values.');
      return;
    }
    if(this.item.id) {
      this.update();
    } else {
      this.create();
    }
  }

  private create(): void {
    // this.api.createUser(this.item).subscribe((data) => {
    //   console.log(data);
    //   this.router.navigateByUrl('user-list/' + this.item.id + '/view').finally(() => {
    //   });
    // }, (error) => {
    //   this.item.id = undefined;
    //   console.log(error);
    //   this.toastr.error('Oops! Create failed...');
    // });
  }

  private update(): void {
    // this.api.updateUser(this.item).subscribe((data) => {
    //   console.log(data);
    //   this.router.navigateByUrl('user-list/' + this.item.id + '/view').finally(() => {
    //   });
    // }, (error) => {
    //   console.log(error);
    //   this.toastr.error('Oops! Update failed...');
    // });
  }

}
