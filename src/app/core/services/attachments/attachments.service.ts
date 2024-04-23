import { Injectable } from '@angular/core';
import { EntityType } from '@constants/entities';
import { AttachmentDTO } from '@models/attachment-dto.model';
import { SaveAttachmentResponseDTO } from '@models/save-attachment-response-dto.model';
import { ApiService } from '@services/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AttachmentsService {
  private _endpointURL = '/attachments';

  constructor(private readonly apiService: ApiService) {}

  getAttachmentsByEntityId(
    entity: EntityType,
    entityId: number
  ): Observable<AttachmentDTO[]> {
    return this.apiService.read<AttachmentDTO[]>(
      `${this._endpointURL}/searchAttachFileList?entityType=${entity}&entityId=${entityId}`
    );
  }

  saveAttachmentsByEntityId(
    base64File: string,
    fileName: string,
    entity: EntityType,
    entityId: number
  ): Observable<SaveAttachmentResponseDTO> {
    return this.apiService.create<SaveAttachmentResponseDTO>(
      `${this._endpointURL}/attachFile`,
      {
        body: {
          inputFile: base64File,
          attachment: null,
          title: fileName,
          entityId: entityId,
          entityType: entity.toUpperCase(),
        },
      }
    );
  }
}
