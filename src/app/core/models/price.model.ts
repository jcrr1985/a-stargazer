import { Currency } from './currency.model';
import { Updateable } from './updateable.interface';

export interface Price extends Updateable {
  amount: number;
  currency: Currency;
  negative?: boolean;
  zero?: boolean;
  positive?: boolean;
  notZero?: boolean;
  currencyCode?: string | null;
}
