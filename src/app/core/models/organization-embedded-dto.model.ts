import { Updateable } from './updateable.interface';

export interface OrganizationEmbeddedDTO extends Updateable {
  code: string;
  name: string;
  type: string;
  isActive: boolean;
  isPoRefMandatory: boolean;
  financialStatusType: string;
  invoice: boolean;
}
