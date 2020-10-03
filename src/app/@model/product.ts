import {Model} from "./core";
import {required} from "@rxweb/reactive-form-validators";

export enum ProductType {
  PRODUCT = 'product',
}

export enum ProductStatus {
  DRAFT = 'draft',
  NEW = 'new',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DELETED = 'deleted',
}

export class Product extends Model {

  static KEY = 'products';

  @required()
  type: string;

  @required()
  code: string;

  @required()
  name: string;

  @required()
  status: string;

  @required()
  userId: string;

  constructor() {
    super();
    this.status = ProductStatus.ACTIVE;
    this.type = ProductType.PRODUCT;
  }
}
