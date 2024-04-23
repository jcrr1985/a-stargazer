import { KeyValueObject, LocalDate } from './models';

export interface IncidentDetailDTO {
  user: string;
  time: LocalDate;
  revision: number;
  actionPerformed: string;
  technicalComplements?: KeyValueObject[];
  entityAffectedName?: string;
  entityAffectedId?: number;
}
