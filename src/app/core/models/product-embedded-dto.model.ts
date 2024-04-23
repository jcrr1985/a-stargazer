import { InvoiceOrganization } from './invoice-organization.model';
import { Price } from './price.model';
import { Product } from './product.model';

export interface ProductEmbeddedDTO extends Product {
  price: Price | null;
  priceUnit: string | null;
  invoiceOrganization: InvoiceOrganization | null;
  deadline: null;
  quantity: number | null;
  description: string | null;
}
