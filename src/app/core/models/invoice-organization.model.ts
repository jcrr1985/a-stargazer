import { Updateable } from './updateable.interface';

export interface InvoiceOrganization extends Updateable {
  code: string;
  name: string;
  type?: string | null;
  isActive?: boolean;
  isPoRefMandatory?: boolean;
  financialStatusType?: string | null;
  invoice?: boolean;
}
