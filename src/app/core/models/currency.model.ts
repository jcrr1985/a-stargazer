import { Updateable } from './updateable.interface';

export interface Currency extends Updateable {
  code: string;
  name: string;
}
