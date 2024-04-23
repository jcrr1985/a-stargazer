import { EntityType } from '@constants/entities';
import { AttachmentDTO } from '@models/attachment-dto.model';
import { SaveAttachmentResponseDTO } from '@models/save-attachment-response-dto.model';
import { of } from 'rxjs';
import { AttachmentsService } from './attachments.service';

describe('AttachmentsService', () => {
  let service: AttachmentsService;
  let apiServiceSpy: { create: jasmine.Spy; read: jasmine.Spy };
  let fakeAttachmentList: AttachmentDTO[];
  let fakeAttachmentResponse: SaveAttachmentResponseDTO;

  beforeEach(() => {
    fakeAttachmentList = [
      {
        id: 455202,
        version: 7,
        subject: 'screenshot.2019-06-07 (8)',
        receptionDate: [2019, 6, 7, 20, 9, 11],
        attachmentDate: [2019, 6, 7, 20, 9, 11],
        recipients: null,
        sender: null,
        senderEmail: null,
        eventNo: null,
        fileFormat: 'JPG',
        attachmentType: null,
        fileUrl:
          'http://qual-workspaces.ebu.ch/neos/Shared%20Documents/incident/65538/screenshot_2019_06_07__8__1578528543802.JPG',
        archived: true,
        entityId: 65538,
        entityName: 'INCIDENT',
        oubookingConfirmed: false,
      },
    ];
    fakeAttachmentResponse = {
      inputFile:
        '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',
      title: 'download.png',
      entityId: 103973,
      entityType: 'INCIDENT',
      attachment: {
        id: 1011164,
        version: 0,
        subject: 'download',
        receptionDate: [2023, 10, 2, 15, 6, 55],
        attachmentDate: [2023, 10, 2, 15, 6, 55],
        recipients: null,
        sender: null,
        senderEmail: null,
        eventNo: null,
        fileFormat: 'PNG',
        attachmentType: null,
        fileUrl:
          'http://qual-workspaces.ebu.ch/neos/Shared%20Documents/incident/103973/download.PNG',
        archived: false,
        entityId: 103973,
        entityName: 'INCIDENT',
        oubookingConfirmed: false,
      },
    };

    apiServiceSpy = jasmine.createSpyObj('ApiService', ['read', 'create']);
    service = new AttachmentsService(apiServiceSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch attachments by entity id', () => {
    apiServiceSpy.read.and.returnValue(of(fakeAttachmentList));

    service
      .getAttachmentsByEntityId(EntityType.INCIDENT, 65538)
      .subscribe((res) => expect(res).toEqual(fakeAttachmentList), fail);
  });

  it('should save attachment', () => {
    apiServiceSpy.create.and.returnValue(of(fakeAttachmentResponse));

    service
      .saveAttachmentsByEntityId(
        'somebas64string',
        'file.png',
        EntityType.INCIDENT,
        65538
      )
      .subscribe((res) => expect(res).toEqual(fakeAttachmentResponse), fail);
  });
});
