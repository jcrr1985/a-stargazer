import { Updateable } from './updateable.interface';

export interface ResourceProfileDTO extends Updateable {
  code: string;
  name: string;
  type: string;
  canHaveProduct: boolean;
}
