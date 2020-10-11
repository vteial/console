import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../@shared/base.component";
import {ApiService} from "../../@shared/api.service";
import {ToastrService} from "ngx-toastr";
import {RxFormBuilder} from "@rxweb/reactive-form-validators";
import {FormGroup} from "@angular/forms";
import {LocalStorageService} from "ngx-webstorage";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../@model/product";
import {AuthService} from "../../@shared/auth.service";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent extends BaseComponent implements OnInit {

  backLink: string;

  itemId: string;

  item: Product;

  itemFg: FormGroup;

  constructor(private auth: AuthService,
              private api: ApiService,
              private toastr: ToastrService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private storage: LocalStorageService,
              private formBuilder: RxFormBuilder) {
    super();
    this.viewName = 'Add / Edit Product';
    this.backLink = '/products';
  }

  ngOnInit(): void {
    this.item = new Product();
    this.itemId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.itemId === '-') {
      this.backLink = '/product';
      this.viewName = 'Add Product';
      this.item.userId = this.auth.appSession.appUser.id;
      this.itemFg = this.formBuilder.formGroup(this.item);
    } else {
      this.backLink = `/products/${this.itemId}/view`;
      this.viewName = 'Edit Product';
      const src = this.storage.retrieve(Product.KEY);
      if (src) {
        this.item = Object.assign(this.item, src);
        this.itemFg = this.formBuilder.formGroup(this.item);
      } else {
        this.reload();
      }
    }
  }

  reload(): void {
    this.api.fetchProductById(this.itemId).subscribe(res => {
      if (res.exists) {
        this.item = Object.assign(this.item, res.data());
        this.itemFg = this.formBuilder.formGroup(this.item);
      } else {
        this.toastr.error(`Product with id '${this.itemId}' doesn't exists...`);
      }
    });
  }

  save(): void {
    // console.log(this.itemFg);
    if (!this.itemFg.touched) {
      this.toastr.info('There is no changes to save...');
      return;
    }
    if (this.itemFg.invalid) {
      this.toastr.error('Please fix the error fields by providing valid values.');
      return;
    }
    if (this.item.id) {
      this.update();
    } else {
      this.create();
    }
  }

  private create(): void {
    this.item.preCreate(this.auth.appSession.appUser.id, new Date());
    this.api.createProduct(this.item).then(res => {
      this.router.navigateByUrl('/products');
    }).catch(error => {
      this.toastr.error('Oops! Create failed...');
      console.log(error);
    });
  }

  private update(): void {
    this.item.preUpdate(this.auth.appSession.appUser.id, new Date());
    this.api.updateProduct(this.item).then(res => {
      this.router.navigateByUrl('/products');
    }).catch(error => {
      this.toastr.error('Oops! Update failed...');
      console.log(error);
    });
  }

  remove(): void {
    this.toastr.warning('Delete is not yet implemented...');
  }

}
