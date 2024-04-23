import { AttachmentDTO } from './attachment-dto.model';
import { DomainItem } from './domain-item.model';

export interface Note {
  id: number;
  version: number;
  title: string;
  description: string;
  category: string | null;
  status: string | null;
  visibilities: DomainItem[];
  highVisibility: boolean;
  attachments: AttachmentDTO[];
  relevantEntityLinks: any[]; // TODO: Type this when we have more information. So far API always return empty array on this property
  creationDate: Date;
  creationUser: string;
  lastUpdateDate: Date | null;
  lastUpdateUser: string | null;
  entities: DomainItem[];
  archived: boolean;
  readOnly: boolean;
}
