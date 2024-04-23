import { Updateable } from './updateable.interface';

export interface EventType extends Updateable {
  sequence: number | string;
  keyCode: string;
  code: string;
  externalCode: string | null;
  label: string;
  extView: boolean;
  externalLabel: string | null;
  itemStatus: string;
  isoCode?: string | null;
  name?: string | null;
}
