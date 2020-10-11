import {Model} from "./core";
import {Tran} from "./tran";
import {prop} from "@rxweb/reactive-form-validators";

export class Receipt extends Model {

  static KEY = 'receipts';

  category: string;

  @prop()
  totalAmount: number;

  @prop()
  receivedAmount: number;

  balanceAmount; number;

  dateTime: number;

  status: string;

  @prop()
  refText: string;

  @prop()
  description: string;

  @prop()
  customerId: string;

  // employeeId: string;

  ownerId: string;

  trans: Array<Tran>;

  constructor() {
    super();
    this.trans = new Array<Tran>();
  }

}
