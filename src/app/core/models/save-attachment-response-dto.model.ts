import { AttachmentDTO } from './attachment-dto.model';

export interface SaveAttachmentResponseDTO {
  inputFile: string;
  title: string;
  entityId: number;
  entityType: string;
  attachment: AttachmentDTO;
}
