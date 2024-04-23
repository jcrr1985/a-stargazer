import { IncidentBase } from './incident-base.model';
import { TransmissionLightDTO } from './transmission-light-dto.model';

export interface ExtendedTransmissionDTO {
  id: any | null;
  version: number;
  entityTrackerIdBean: any | null;
  transmission: TransmissionLightDTO;
}

export interface SaveIncidentRequestDTO extends IncidentBase {
  identifier: string | null; // Null when create. On update this needs 'no' field value
  name: string; // This needs to take the description truncated by 30 characters with an (...) if truncated
  defaultEntityType: 'INCIDENT'; // We need this to be sent always
  entityNameEnum: 'INCIDENT'; // We need this to be sent always
  entityTrackerIdBean: any | null; // Null when create. When edit Eurovision needs to confirm entity. Leaving any until then
  entityType: 'INCIDENT'; // We need this to be sent always
  xrmManagedIncident: boolean; // False on creation, and received value when editing
  code: string | null; // Null when create. On update this needs 'no' field value
}
