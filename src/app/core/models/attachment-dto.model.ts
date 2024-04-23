import { LocalDate } from './models';

export interface AttachmentDTO {
  id: number;
  version: number;
  subject: string;
  receptionDate: LocalDate;
  attachmentDate: LocalDate;
  recipients: any | null; // consultar tipado
  sender: any | null;
  senderEmail: string | null;
  eventNo: string | null;
  fileFormat: string;
  attachmentType: string | null;
  fileUrl: string;
  archived: boolean;
  entityId: number;
  entityName: string;
  oubookingConfirmed: boolean;
}
