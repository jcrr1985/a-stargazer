import { SearchOrganizationFormValue, YesNoOption } from '@models/models';
import { OrganizationEmbeddedDTO } from '@models/organization-embedded-dto.model';
import { of } from 'rxjs';
import { OrganizationsService } from './organizations.service';

describe('OrganizationsService', () => {
  let service: OrganizationsService;
  let apiServiceSpy: { create: jasmine.Spy };
  let fakeOrganizations: OrganizationEmbeddedDTO[];

  beforeEach(() => {
    fakeOrganizations = [
      {
        id: 31522,
        version: 4,
        code: '00AVRO',
        name: 'Vereniging AVROTROS',
        type: 'MEMB',
        isActive: false,
        isPoRefMandatory: false,
        financialStatusType: 'OK',
        invoice: false,
      },
      {
        id: 31460,
        version: 4,
        code: '00BR',
        name: 'Bayerischer Rundfunk',
        type: 'MEMB',
        isActive: false,
        isPoRefMandatory: false,
        financialStatusType: 'OK',
        invoice: false,
      },
    ];
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['create']);
    service = new OrganizationsService(apiServiceSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch organizations', () => {
    apiServiceSpy.create.and.returnValue(of(fakeOrganizations));

    service.getFilteredOrganizations('').subscribe((res) => {
      expect(res).toEqual(fakeOrganizations);
    }, fail);
  });

  it('should fetch organizations by transmissions ID', () => {
    apiServiceSpy.create.and.returnValue(of(fakeOrganizations));

    service.getOrganizationsByTransmissionIdList([1]).subscribe((res) => {
      expect(res).toEqual(fakeOrganizations);
    }, fail);
  });

  it('should call searchOrganization with correct parameters', () => {
    apiServiceSpy.create.and.returnValue(of([]));
    const formValue: SearchOrganizationFormValue = {
      code: 'ORG001',
      name: 'Organization 1',
      type: ['Type 1', 'Type 2'],
      country: ['USA', 'Canada'],
      defaultCity: ['New York', 'Toronto'],
      financialStatusType: ['Active', 'Inactive'],
      isCustomer: [YesNoOption.Yes],
      isProvider: [YesNoOption.Yes],
      isActive: [YesNoOption.Yes],
      isBilledCurrencyLocked: [YesNoOption.Yes],
      isPoRefMandatory: [YesNoOption.Yes],
    };

    const expectedRequestBody = {
      first: 0,
      max: 1000,
      orders: [],
      terms: [
        {
          identifier: 'code',
          value: 'ORG001',
          type: 'Like',
          likeType: 'CONTAINS',
          operator: true,
        },
        {
          identifier: 'name',
          value: 'Organization 1',
          type: 'Like',
          likeType: 'CONTAINS',
          operator: true,
        },
        { identifier: 'type', value: ['Type 1', 'Type 2'], type: 'In' },
        {
          identifier: 'financialStatusType',
          value: ['Active', 'Inactive'],
          type: 'In',
        },
        { identifier: 'isCustomer', value: ['Y'], type: 'In' },
        { identifier: 'isProvider', value: ['Y'], type: 'In' },
        { identifier: 'isActive', value: ['Y'], type: 'In' },
        { identifier: 'isBilledCurrencyLocked', value: ['Y'], type: 'In' },
        { identifier: 'isPoRefMandatory', value: ['Y'], type: 'In' },
      ],
      relations: [
        {
          type: 'Fetch',
          relationEntity: 'country',
          terms: [],
          subJoin: null,
          joinType: 'INNER',
        },
        {
          type: 'Fetch',
          relationEntity: 'defaultCity',
          terms: [],
          subJoin: null,
          joinType: 'INNER',
        },
      ],
      values: {},
    };

    service.searchOrganization(formValue).subscribe((organizations) => {
      expect(organizations).toEqual([]);
    }, fail);

    expect(apiServiceSpy.create).toHaveBeenCalledWith(
      '/organizations/result/search',
      { body: expectedRequestBody }
    );
  });
});
