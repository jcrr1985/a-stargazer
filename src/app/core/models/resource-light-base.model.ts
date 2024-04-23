import { Updateable } from './updateable.interface';

export interface ResourceLightBase extends Updateable {
  type: string;
  code: string;
  codeLocal: string;
  name: string;
}
