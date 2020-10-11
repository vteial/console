import { Injectable } from '@angular/core';
import {AuthService} from "../@shared/auth.service";
import {ApiService} from "../@shared/api.service";
import {Router} from "@angular/router";
import {LocalStorageService} from "ngx-webstorage";
import {RxFormBuilder} from "@rxweb/reactive-form-validators";
import {Receipt} from "../@model/receipt";
import {Tran} from "../@model/tran";
import {Product} from "../@model/product";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  receipt: Receipt

  tran: Tran;

  tranIndex: number;

  constructor(public auth: AuthService,
              public api: ApiService,
              public router: Router,
              public storage: LocalStorageService) {
    this.newReceipt();
  }

  newReceipt(): void {
    this.receipt = new Receipt();
    this.receipt.customerId = 'guest';
    this.newTran();
    this.computeTotalAmount();
  }

  newTran(): Tran {
    this.tran = new Tran();
    this.tranIndex = this.receipt.trans.length - 1;
    return this.tran;
  }

  addTran(): void {
    this.tran.id = '-';
    this.receipt.trans.push(this.tran);
    this.computeTotalAmount();
  }

  editTran(index: number): Tran {
    this.tran = this.receipt.trans[index];
    this.tranIndex = index;
    return this.tran;
  }

  updateTran(): void {
    this.computeTotalAmount();
  }

  removeTran(index: number): void {
    this.receipt.trans.splice(index, 1);
    this.computeTotalAmount();
    if (this.receipt.trans.length === 0) {
      this.tran = null;
      this.tranIndex = null;
    }
    if (index === this.receipt.trans.length) {
      index--;
      this.tran = this.receipt.trans[index];
      this.tranIndex = index;
    }
  }

  onProduct(product: Product): void {
    this.tran.product = product;
    // this.tran.computeAmount();
    // if(this.tran.id) {
    //   this.computeTotalAmount();
    // }
  }

  onUnit(): void {
    this.tran.computeAmount();
    if(this.tran.id) {
      this.computeTotalAmount();
    }
  }

  onRate(): void {
    this.tran.computeAmount();
    if(this.tran.id) {
      this.computeTotalAmount();
    }
  }

  private computeTotalAmount(): void {
    let tamount = 0;
    for(let tran of this.receipt.trans) {
      tamount += tran.amount;
    }
    this.receipt.totalAmount = tamount;
  }
}

