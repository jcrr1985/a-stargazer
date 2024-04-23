import { AttachmentDTO } from './attachment-dto.model';
import { CategoryIncidentDTO } from './category-incident-dto.model';
import { IncidentOwnerDTO } from './incident-owner-dto.model';
import { LocalDate } from './models';
import { OrganizationEmbeddedDTO } from './organization-embedded-dto.model';
import { ResourceLightBase } from './resource-light-base.model';
import { ResourceWithProfileAndEventLightDTO } from './resource-with-profile-and-event-light-dto.model';
import { ExtendedTransmissionDTO } from './save-incident-request-dto.model';
import { SubcategoryIncidentDTO } from './subcategory-incident-dto.model';
import { TransmissionLightDTO } from './transmission-light-dto.model';

export interface IncidentBase {
  action: string | null;
  attachments: AttachmentDTO[];
  category: CategoryIncidentDTO;
  description: string | null;
  displayOnReport: boolean;
  duringProgram: boolean;
  duringTransmission: boolean;
  endDate: LocalDate;
  id: number | null;
  informationToCaller: string | null;
  no: number | string | null; // Null on creation. On edit, we mantain existing value
  noteChanges: {
    notesChanged: any[]; // Any[] until Eurovision confirms
    notesRemoved: any[]; // Any[] until Eurovision confirms
  };
  notes: any[]; // Any[] until Eurovision confirms
  organizations: OrganizationEmbeddedDTO[];
  owner: IncidentOwnerDTO;
  reFeed: 'EVC_RECORDING' | 'NO' | 'ORIGIN' | null;
  region: 'ALL' | 'AMERICA' | 'ASIA' | 'EUROPE' | 'FIBER' | 'OTHER' | null;
  resolution: string | null;
  resources: (ResourceLightBase | ResourceWithProfileAndEventLightDTO)[];
  responsible: 'YES' | 'NO' | 'UNKNOWN' | null;
  reviewed: boolean;
  serviceAffecting: 'YES' | 'NO' | 'UNKNOWN';
  serviceReestablished: boolean;
  startDate: LocalDate;
  status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
  subCategory: SubcategoryIncidentDTO;
  subject: string | null;
  transmissions: (TransmissionLightDTO | ExtendedTransmissionDTO)[];
  version: number; // 0 on creation. On edit, we mantain existing value
}
