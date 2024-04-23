import { Updateable } from './updateable.interface';

export interface DomainItem extends Updateable {
  sequence: number;
  keyCode: string | null;
  code: string;
  isoCode: any;
  externalCode?: string | null;
  label: string;
  extView: boolean;
  externalLabel?: string | null;
  itemStatus: string;
  name?: string | null;
}
