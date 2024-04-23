import { LocalDate } from './models';
import { Updateable } from './updateable.interface';

export interface AvailabilityDefinition extends Updateable {
  type: string;
  description: string;
  startDate: LocalDate;
  endDate: LocalDate;
  transponderDetail: string | null;
  transponderInfo: string | null;
}
