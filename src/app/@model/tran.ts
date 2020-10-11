import {Model} from "./core";
import {prop} from "@rxweb/reactive-form-validators";
import {Product} from "./product";

export enum TranType {
  BUY = 'buy',
  SELL = 'sell',
}

export enum TranStatus {
  DRAFT = 'draft',
  NEW = 'new',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DELETED = 'deleted',
}

export class Tran extends Model {

  static KEY = 'trans';

  @prop()
  productId: string;

  product: Product;

  category: string;

  @prop()
  type: string;

  @prop()
  unit: number;

  @prop()
  rate: number;

  amount: number;

  dateTime: number;

  status: string;

  @prop()
  refText: string;

  @prop()
  description: string;

  customerId: string;

  // employeeId: string;

  ownerId: string;

  receiptId: string;

  constructor() {
    super();
    this.productId = null;
    this.type = TranType.SELL
    this.amount = 0;
  }

  computeAmount(): void {
    if(this.unit && this.rate) {
      this.amount = this.unit * this.rate;
    } else {
      this.amount = 0;
    }
  }
}
