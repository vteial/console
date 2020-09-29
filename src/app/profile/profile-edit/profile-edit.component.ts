import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {FormGroup} from '@angular/forms';
import {RxFormBuilder} from '@rxweb/reactive-form-validators';
import {Router} from '@angular/router';
import {ApiService} from "../../@shared/api.service";
import {AuthService} from "../../@shared/auth.service";
import {User} from '../../@model/user';
import {BaseComponent} from '../../@shared/base.component';
import {AngularFireStorage} from "@angular/fire/storage";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent extends BaseComponent implements OnInit {

  item: User;

  itemFg: FormGroup;

  photoUrl: string;

  constructor(private auth: AuthService,
              private api: ApiService,
              private toastr: ToastrService,
              private router: Router,
              private formBuilder: RxFormBuilder,
              private afStorage: AngularFireStorage) {
    super();
    super.viewName = 'Edit Profile';
  }

  ngOnInit(): void {
    this.item = this.auth.appSession.appUser;
    this.photoUrl = this.item.photoUrl;
    this.itemFg = this.formBuilder.formGroup(this.item);
  }

  onProfilePhotoSelect(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      let fpath = `/${this.item.id}/profilePhoto`;
      fpath += file.name.substring(file.name.indexOf('.'));
      console.log(`fpath : ${fpath}`);
      this.afStorage.upload(fpath, file).then(res => {
        console.log(res)
        if (res) {
          this.toastr.success('Profile photo uploaded successfully...');
          this.updateProfilePhotoMetaData(res.ref);
        }
      });
    }
  }

  private updateProfilePhotoMetaData(afStorageRef: firebase.storage.Reference): void {
    afStorageRef.getDownloadURL().then(res => {
      if (res) {
        this.item.photoUrl = res;
        this.api.updateUser(this.item);
      }
    });
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
    this.api.updateUser(this.item)
      .then(res => {
        this.toastr.info('Successfully updated...');
        this.router.navigate(['profile'])
      })
      .catch(error => {
        console.log(error)
        this.toastr.error('Unable to update...');
      });
  }

}
