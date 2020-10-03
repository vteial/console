import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../@shared/base.component";
import {ApiService} from "../../@shared/api.service";
import {ToastrService} from "ngx-toastr";
import {Product} from "../../@model/product";
import {ActivatedRoute, Router} from "@angular/router";
import {LocalStorageService} from "ngx-webstorage";
import {User} from "../../@model/user";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent extends BaseComponent implements OnInit {

  itemId: string;

  item: Product;

  constructor(private api: ApiService,
              private toastr: ToastrService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private storage: LocalStorageService) {
    super();
    super.viewName = 'Product Detail';
  }

  ngOnInit(): void {
    this.item = new Product();
    this.itemId = this.activatedRoute.snapshot.paramMap.get('id');
    const src = this.storage.retrieve(Product.KEY);
    if (src) {
      this.item = Object.assign(this.item, src);
    } else {
      this.reload();
    }
  }

  reload(): void {
    this.api.fetchProductById(this.itemId).subscribe(res => {
      if (res.exists) {
        this.item = Object.assign(this.item, res.data());
      } else {
        this.toastr.error(`Product with id '${this.itemId}' doesn't exists...`);
      }
    });
  }

  edit(): void {
    this.storage.store(Product.KEY, this.item);
    this.router.navigateByUrl(`/products/${this.item.id}/edit`);
  }

}
