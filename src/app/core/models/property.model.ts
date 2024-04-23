import { Updateable } from './updateable.interface';

export interface Property extends Updateable {
  groupProperty: string;
  code: string;
  name: string;
  description: string;
  inputConstraint: string;
  inputType: string;
  entityType: string;
  entitySubType: string;
  format: string | null;
  rangeBegin: number | null;
  rangeEnd: number | null;
  unit: string | null;
  defaultValue: string | null;
  sequenceProperty: number;
  locked: boolean;
  keyCode?: string | null;
}
