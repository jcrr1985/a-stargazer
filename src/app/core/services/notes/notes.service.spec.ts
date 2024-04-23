import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EntityType } from '@constants/entities';
import { Note } from '@models/note.model';
import { ApiService } from '@services/api/api.service';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { of } from 'rxjs';
import { NotesService } from './notes.service';

describe('NotesService', () => {
  let service: NotesService;
  let apiServiceSpy: { create: jasmine.Spy; read: jasmine.Spy };
  let fakeNotes: Note[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, LoggerTestingModule],
      providers: [ApiService, NotesService],
    });

    apiServiceSpy = jasmine.createSpyObj('ApiService', ['read', 'create']);
    service = new NotesService(apiServiceSpy as any);

    fakeNotes = [
      {
        id: 1,
        version: 1,
        title: 'Dummy Note',
        description: 'This is a dummy note.',
        category: null,
        status: null,
        visibilities: [
          {
            version: 1,
            id: 1,
            sequence: 1,
            keyCode: 'dummy',
            code: 'DUMMY',
            isoCode: null,
            externalCode: null,
            label: 'Dummy',
            extView: false,
            externalLabel: null,
            itemStatus: 'ACTIVE',
            businessKey: 'dummy',
            new: false,
          },
        ],
        highVisibility: false,
        attachments: [],
        relevantEntityLinks: [],
        creationDate: new Date(),
        creationUser: 'dummy',
        lastUpdateDate: null,
        lastUpdateUser: null,
        entities: [
          {
            version: 1,
            id: 1,
            sequence: 1,
            keyCode: 'mock',
            code: 'MOCK',
            isoCode: null,
            externalCode: null,
            label: 'Mock',
            extView: false,
            externalLabel: null,
            itemStatus: 'ACTIVE',
            businessKey: 'mock',
            new: false,
          },
        ],
        archived: false,
        readOnly: false,
      },
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch notes by id', () => {
    apiServiceSpy.read.and.returnValue(of(fakeNotes));

    service.getNotesByEntityId(65538, EntityType.EVENT).subscribe((notes) => {
      expect(notes).toEqual(fakeNotes);
    }, fail);
  });
});
