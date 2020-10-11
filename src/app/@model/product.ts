import {Model} from "./core";
import {required} from "@rxweb/reactive-form-validators";

export enum ProductCategory {
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
  category: string;

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
    this.category = ProductCategory.PRODUCT;
  }
}
