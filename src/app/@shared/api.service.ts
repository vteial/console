import {Injectable} from '@angular/core';
import {User} from "../@model/user";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private userCol: AngularFirestoreCollection<User>;

  constructor(private fbStore: AngularFirestore) {
  }

  private getUserCollection(): AngularFirestoreCollection<User> {
    if (!this.userCol) {
      this.userCol = this.fbStore.collection<User>(`/${User.KEY}`);
    }
    return this.userCol;
  }

  fetchUsers(): Observable<User[]> {
    return this.getUserCollection().valueChanges();
  }

  fetchUserById(id: string) {
    return this.getUserCollection().doc(id).get();
  }

  createUser(model: User) {
    if(!model.id) {
      model.id = this.fbStore.createId();
    }
    return this.getUserCollection().add(Object.assign({}, model));
  }

  updateUser(model: User) {
    return this.getUserCollection().doc(model.id).update(Object.assign({}, model));
  }

  removeUser(model: User) {
    return this.getUserCollection().doc(model.id).delete();
  }

}

