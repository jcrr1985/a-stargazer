import { EventType } from './event-type-dto.model';
import { LocalDate } from './models';

export interface EventDTO {
  id: number | string;
  version: number | string;
  periodBegin: LocalDate;
  periodEnd: LocalDate;
  no: number | string;
  description: string;
  eventType: EventType;
}
