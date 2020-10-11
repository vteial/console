import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AngularFirestore} from "@angular/fire/firestore";
import {AuthService} from "../@shared/auth.service";
import {ApiService} from "../@shared/api.service";
import {BaseComponent} from "../@shared/base.component";
import {User, UserProvider, UserRole, UserStatus} from "../@model/user";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent extends BaseComponent implements OnInit {

  constructor(private auth: AuthService,
              private fbStore: AngularFirestore,
              private api: ApiService,
              private toastr: ToastrService,
              private router: Router) {
    super();
    super.viewName = 'Settings';
  }

  ngOnInit(): void {
  }

  initializeOrReset(): void {
    const model = new User();
    model.id = 'guest@bigsales.com'
    model.userId = model.id;
    model.name = 'guest';
    model.email = model.id;
    model.mobile = '1234567890';
    model.photoUrl = 'assets/images/avatar_2x.png';
    model.emailVerified = false;
    model.roleId = UserRole.CUSTOMER;
    model.providedBy = UserProvider.SELF;
    model.status = UserStatus.ACTIVE;
    const modelRef = this.fbStore.collection<User>(`/${User.KEY}`).doc(model.id);
    modelRef.get().subscribe(res => {
      let modelPromise = null, now = new Date();
      if (res.exists) {
        model.preCreate(model.id, now);
        modelPromise = modelRef.update(Object.assign({}, model));
      } else {
        model.preCreate(model.id, now);
        modelPromise = modelRef.set(Object.assign({}, model));
      }
      modelPromise.then(() => {
        this.toastr.success('Successfully initialized...');
      });
      modelPromise.catch(error => {
        this.toastr.error('Initialization failed...');
      });
    });
  }
}


// this.fbStore.collection<User>(`/${User.KEY}`, ref => {
//   let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
//   query = query.where('email', '==', model.email)
//   query = query.limit(1);
//   return query;
// }).valueChanges().subscribe(res => {
//   const now = new Date();
//   if (res.length == 0) {
//     model.preCreate(model.id, now);
//     this.api.createOrUpdateUser(model).then(res => {
//       this.toastr.success('Successfully initialized...');
//     }).catch(error => console.log(error));
//   } else {
//     this.toastr.success('Successfully initialized...');
//   }
// });

// this.api.fetchUserById(model.id).subscribe(res => {
//   const now = new Date();
//   if (res.exists) {
//     model.preUpdate(model.id, now);
//     this.api.updateUser(model).catch(error => console.log(error));
//   } else {
//     model.preCreate(model.id, now);
//     this.api.createOrUpdateUser(model).catch(error => console.log(error));
//   }
//   this.toastr.success('Successfully initialized...');
// });

