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

  photoUrl: string;

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
    this.item = new User()
    Object.assign(this.item, this.storage.retrieve(User.KEY))
    this.photoUrl = this.item.photoUrl;
    this.itemFg = this.formBuilder.formGroup(this.item);
  }

  save(): void {
    if (!this.itemFg.touched) {
      this.toastr.info('There is no changes to save...');
      return;
    }
    // console.log(this.itemFg);
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
    this.api.createUser(this.item).then(data => {
        this.storage.store(User.KEY, this.item);
        this.router.navigateByUrl('/users/' + this.item.id + '/view');
    }).catch(error => {
      this.toastr.error('Oops! Create failed...');
      console.log(error);
    });
  }

  private update(): void {
    this.api.updateUser(this.item).then(data => {
      this.storage.store(User.KEY, this.item);
      this.router.navigateByUrl('/users/' + this.item.id + '/view');
    }).catch(error => {
      this.toastr.error('Oops! Update failed...');
      console.log(error);
    });
  }

}
