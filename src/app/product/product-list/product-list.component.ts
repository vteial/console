import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../@shared/base.component";
import {Observable} from "rxjs";
import {ApiService} from "../../@shared/api.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Product} from "../../@model/product";
import {LocalStorageService} from "ngx-webstorage";
import {AngularFirestore} from "@angular/fire/firestore";
import {AuthService} from "../../@shared/auth.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent extends BaseComponent implements OnInit {

  items: Observable<Product[]>;

  constructor(private auth: AuthService,
              private fbStore: AngularFirestore,
              private api: ApiService,
              private toastr: ToastrService,
              private router: Router,
              private storage: LocalStorageService) {
    super();
    super.viewName = 'Products';
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    // this.items = this.api.fetchProducts();
    this.items = this.fbStore.collection<Product>(`/${Product.KEY}`, ref => {
      let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      query = query.where('userId', '==', this.auth.appSession.appUser.id)
      query = query.orderBy('createdTime', 'desc')
      return query;
    }).valueChanges();
  }

  view(item: Product): void {
    this.storage.store(Product.KEY, item);
    this.router.navigateByUrl(`/products/${item.id}/view`);
  }

  edit(item: Product): void {
    this.storage.store(Product.KEY, item);
    this.router.navigateByUrl(`/products/${item.id}/edit`);
  }
}
