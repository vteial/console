import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Observable, of} from "rxjs";
import {User} from "../@model/user";
import {Product} from "../@model/product";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private userCol: AngularFirestoreCollection<User>;

  private productCol: AngularFirestoreCollection<Product>;

  constructor(private fbStore: AngularFirestore) {
  }

  // users

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

  createOrUpdateUser(model: User) {
    return this.getUserCollection().doc(model.id).set(Object.assign({}, model), {merge: true});
  }

  createUser(model: User) {
    model.id = this.fbStore.createId();
    return this.getUserCollection().doc(model.id).set(Object.assign({}, model));
  }

  updateUser(model: User) {
    return this.getUserCollection().doc(model.id).update(Object.assign({}, model));
  }

  removeUser(model: User) {
    return this.getUserCollection().doc(model.id).delete();
  }

  // products

  fetchProductsMock(): Observable<Product[]> {
    const models = new Array<Product>();
    let model = new Product();
    model.id = 'usd';
    model.code = 'usd';
    model.name = 'united states dollar';
    models.push(model);
    model = new Product();
    model.id = 'sgd';
    model.code = 'sgd';
    model.name = 'singapore dollar';
    models.push(model);
    return of(models);
  }

  private getProductCollection(): AngularFirestoreCollection<Product> {
    if (!this.productCol) {
      this.productCol = this.fbStore.collection<Product>(`/${Product.KEY}`);
    }
    return this.productCol;
  }

  fetchProducts(): Observable<Product[]> {
    return this.getProductCollection().valueChanges();
  }

  fetchProductById(id: string) {
    return this.getProductCollection().doc(id).get();
  }

  createOrUpdateProduct(model: Product) {
    return this.getProductCollection().doc(model.id).set(Object.assign({}, model), {merge: true});
  }

  createProduct(model: Product) {
    model.id = this.fbStore.createId();
    return this.getProductCollection().doc(model.id).set(Object.assign({}, model));
  }

  updateProduct(model: Product) {
    return this.getProductCollection().doc(model.id).update(Object.assign({}, model));
  }

  removeProduct(model: Product) {
    return this.getProductCollection().doc(model.id).delete();
  }

}

