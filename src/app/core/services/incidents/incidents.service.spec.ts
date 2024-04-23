import { CategoryIncidentDTO } from '@models/category-incident-dto.model';
import { IncidentDTO } from '@models/incident-dto.model';
import { IncidentOwnerDTO } from '@models/incident-owner-dto.model';
import { SaveIncidentRequestDTO } from '@models/save-incident-request-dto.model';
import { SubcategoryIncidentDTO } from '@models/subcategory-incident-dto.model';
import { of } from 'rxjs';
import { IncidentsService } from './incidents.service';

describe('IncidentsService', () => {
  let service: IncidentsService;
  let apiServiceSpy: { read: jasmine.Spy; create: jasmine.Spy };
  let fakeCategories: CategoryIncidentDTO[];
  let fakeSubCategories: SubcategoryIncidentDTO[];
  let fakeOwners: IncidentOwnerDTO[];
  let fakeIncident: IncidentDTO;

  beforeEach(() => {
    fakeCategories = [
      {
        id: 6,
        version: 0,
        sequence: '10',
        value: 'BUILDING',
        abbreviation: 'Building',
        description: 'Building',
      },
    ];
    fakeSubCategories = [
      {
        id: 12,
        version: 0,
        sequence: '14',
        value: 'B_OTHER',
        abbreviation: 'Bui Other',
        description: 'Other',
        incidentCategory: {
          version: 0,
          id: 6,
          sequence: 10,
          value: 'BUILDING',
          abbreviation: 'Building',
          description: 'Building',
          active: true,
          businessKey: '6',
          new: false,
        },
      },
    ];
    fakeOwners = [
      { id: 1, code: 'WF_EVC', label: 'EVC' },
      { id: 16, code: 'WF_IT', label: 'IT' },
    ];
    fakeIncident = {
      id: 103990,
      version: 0,
      no: 103990,
      description: null,
      startDate: [2023, 10, 3, 1, 0],
      endDate: [2023, 10, 3, 2, 0],
      category: {
        id: 6,
        version: 0,
        sequence: '10',
        value: 'BUILDING',
        abbreviation: 'Building',
        description: 'Building',
      },
      subCategory: {
        id: 3,
        version: 0,
        sequence: '10',
        value: 'ACCESS',
        abbreviation: 'Bui Acc',
        description: 'Access',
        incidentCategory: null,
      },
      transmissions: [],
      resources: [],
      organizations: [],
      status: 'CLOSED',
      reviewed: false,
      responsible: null,
      action: null,
      region: null,
      reFeed: null,
      serviceAffecting: 'NO',
      duringTransmission: true,
      owner: {
        id: 43,
        code: 'STREAMFARM',
        label: 'DMS - Streamfarm',
      },
      resolution: null,
      notes: [],
      noteChanges: {
        notesChanged: [],
        notesRemoved: [],
      },
      attachments: [],
      subject: null,
      serviceReestablished: false,
      informationToCaller:
        'Thank you. We are aware that this transmission is experiencing technical problems. Our team is working to restore the service as soon as possible. We apologise for any inconvenience caused.',
      duringProgram: true,
      displayOnReport: false,
      deleted: false,
    };
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['read', 'create']);
    service = new IncidentsService(apiServiceSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch incident details by id', () => {
    apiServiceSpy.read.and.returnValue(of(fakeIncident));

    service
      .getIncident(65538)
      .subscribe((res) => expect(res).toEqual(fakeIncident), fail);
  });

  it('should save incident', () => {
    apiServiceSpy.create.and.returnValue(of(fakeIncident));

    service
      .saveIncident({} as SaveIncidentRequestDTO)
      .subscribe((res) => expect(res).toEqual(fakeIncident), fail);
  });

  it('should get incident categories', () => {
    apiServiceSpy.create.and.returnValue(of(fakeCategories));

    service
      .getFilteredCategories('')
      .subscribe((res) => expect(res).toEqual(fakeCategories), fail);
  });

  it('should get subcategories by category id', () => {
    apiServiceSpy.create.and.returnValue(of(fakeSubCategories));

    service
      .getSubcategoriesByCategoryId(6)
      .subscribe((res) => expect(res).toEqual(fakeSubCategories), fail);
  });

  it('should get available incident owners', () => {
    apiServiceSpy.create.and.returnValue(of(fakeOwners));

    service
      .getAllOwners()
      .subscribe((res) => expect(res).toEqual(fakeOwners), fail);
  });
});
