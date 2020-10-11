import { Component, OnInit } from '@angular/core';
import {BaseComponent} from "../@shared/base.component";
import {CartService} from "./cart.service";
import {Receipt} from "../@model/receipt";
import {Tran} from "../@model/tran";
import {FormGroup} from "@angular/forms";
import {RxFormBuilder} from "@rxweb/reactive-form-validators";
import {ToastrService} from "ngx-toastr";
import {Product} from "../@model/product";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent extends BaseComponent implements OnInit {

  receipt: Receipt;

  tran: Tran;

  tranFg: FormGroup;

  tranIndex: number;

  products: Array<Product>;

  constructor(
    private cart: CartService,
    private toastr: ToastrService,
    private formBuilder: RxFormBuilder) {
    super();
    this.viewName = 'Cart';
  }

  ngOnInit(): void {
    this.cart.api.fetchProductsMock().subscribe(res => {
      this.products = res;
      console.log(this.products);
    });
    this.receipt = this.cart.receipt;
    this.tran = this.cart.tran;
    this.tranIndex = this.cart.tranIndex;
    this.tranFg = this.formBuilder.formGroup(this.tran);
  }

  new(): void {
    if(this.receipt.id) {
      this.cart.newReceipt();
      this.receipt = this.cart.receipt;
      this.tran = this.cart.tran;
      this.tranIndex = this.cart.tranIndex;
      this.tranFg = this.formBuilder.formGroup(this.tran);
    } else {
      this.tran = this.cart.newTran();
      this.tranFg = this.formBuilder.formGroup(this.tran);
      this.tranIndex = this.receipt.trans.length - 1;
    }
  }

  edit(index: number): void {
    this.tran = this.cart.editTran(index);
    this.tranIndex = this.cart.tranIndex;
    this.tranFg = this.formBuilder.formGroup(this.tran);
  }

  add():void {
    if (!this.tranFg.touched) {
      this.toastr.info('There is no changes to save...');
      return;
    }
    if (this.tranFg.invalid) {
      this.toastr.error('Please fix the error fields by providing valid values.');
      return;
    }
    this.cart.addTran();
    this.new();
  }

  update():void {
    if (this.tranFg.invalid) {
      this.toastr.error('Please fix the error fields by providing valid values.');
      return;
    }
    if (this.tranFg.touched) {
      this.cart.addTran();
    }
    this.new();
  }

  remove(index: number): void {
    this.cart.removeTran(index);
    if(this.receipt.trans.length === 0) {
      this.new();
    } else {
      this.edit(this.cart.tranIndex);
    }
  }

  save(): void {
    // console.log(this.itemFg);
    // if (this.item.id) {
    //   this.update();
    // } else {
    //   this.create();
    // }
  }

  onProduct(): void {
    this.cart.onProduct(this.products.find(o => o.id === this.tran.productId));
  }

  onUnit(): void {
    this.cart.onUnit()
  }

  onRate(): void {
    this.cart.onRate();
  }

  changeCustomer(): void {

  }

  checkOut(): void {

  }
}
