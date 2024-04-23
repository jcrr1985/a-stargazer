import { EventDTO } from './event-dto.model';
import { LocalDate } from './models';

export interface TransmissionLightDTO {
  id: number;
  version: number;
  no: string;
  title: string;
  description: string | null;
  startDate: LocalDate;
  endDate: LocalDate;
  status: string;
  event: EventDTO | null;
}
