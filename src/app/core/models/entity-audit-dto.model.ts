import { KeyValueObject, LocalDate } from './models';

export interface EntityAuditDTO {
  user: string;
  time: LocalDate;
  revision: number;
  actionPerformed: string;
  technicalComplements: KeyValueObject[] | null;
  entityAffectedName: string | null;
  entityAffectedId: number | null;
}
