import { Component } from '@angular/core';
import { EntityType } from '@constants/entities';
import { SaveAttachmentResponseDTO } from '@models/save-attachment-response-dto.model';
import { AttachmentsService } from '@services/attachments/attachments.service';
import { fileToBase64 } from '@shared/utils/helpers';
import { switchMap } from 'rxjs/operators';
import {
  ColumnsConfiguration,
  DataColumnName,
  TableOptions,
} from 'table-generator';

@Component({
  selector: 'app-incident-attachments',
  templateUrl: './incident-attachments.component.html',
  styleUrls: ['./incident-attachments.component.scss'],
})
export class IncidentAttachmentsComponent {
  selectedFiles: SaveAttachmentResponseDTO[] = [];

  allColumns: DataColumnName[] = [
    'attachmentDate',
    'receptionDate',
    'fileType',
    'subjectTitle',
    'event',
    'ouBookingConfirmation',
    'recipients',
    'sender',
    'attachedBy',
    'type',
  ];
  tableOptions: Partial<TableOptions> = {
    showFilter: false,
    showResult: false,
  };
  columnsConfiguration: ColumnsConfiguration = {
    attachmentDate: {
      translateKey: 'attachmentDate',
      type: 'string',
    },
    receptionDate: {
      translateKey: 'receptionDate',
      type: 'string',
    },
    fileType: {
      translateKey: 'fileType',
      type: 'string',
    },
    subjectTitle: {
      translateKey: 'subjectTitle',
      type: 'string',
    },
    event: {
      translateKey: 'event',
      type: 'string',
    },
    ouBookingConfirmation: {
      translateKey: 'ouBookingConfirmation',
      type: 'string',
    },
    recipients: {
      translateKey: 'recipients',
      type: 'string',
    },
    sender: {
      translateKey: 'sender',
      type: 'string',
    },
    attachedBy: {
      translateKey: 'attachedBy',
      type: 'string',
    },
    type: {
      translateKey: 'type',
      type: 'string',
    },
  };

  constructor(private readonly attachmentsService: AttachmentsService) {}

  onFileSelected() {
    const inputNode: any = document.querySelector('input[type=file]');
    const [fileToUpload]: File[] = inputNode.files;
    fileToBase64(fileToUpload)
      .pipe(
        switchMap((fileBase64) => {
          return this.attachmentsService.saveAttachmentsByEntityId(
            fileBase64,
            fileToUpload.name,
            EntityType.INCIDENT,
            0
          );
        })
      )
      .subscribe((response) => {
        // TODO: Complete this functionality when we receive documentation on edit
        // I guess we might need to add this response to the table and something else
        this.selectedFiles.push(response);
      });
  }
}
