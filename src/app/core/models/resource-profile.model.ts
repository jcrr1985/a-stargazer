import { Updateable } from './updateable.interface';

export interface ResourceProfile extends Updateable {
  code: string;
  name: string;
  type: string;
  status: string;
  mobileResource: boolean;
  contacts: boolean;
  canHaveProduct: boolean;
  input: boolean;
  output: boolean;
  required: boolean;
  locked: boolean;
  allowSynopsisNote: boolean;
  abbreviation: string | null;
  overallBitrateManagement: boolean;
}
