import { Updateable } from './updateable.interface';

export interface Product extends Updateable {
  code: string;
  name: string;
  productType: string;
  productCategory: string;
  isMainProduct: boolean;
  isAssociatedProduct: boolean;
  associatedProduct?: boolean;
  mainProduct?: boolean;
}
