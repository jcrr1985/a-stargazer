import { ResourceLightDTO } from '@models/resource-light-dto.model';
import { ResourceWithProfileAndEventLightDTO } from '@models/resource-with-profile-and-event-light-dto.model';
import { SunOutageAvailabilityDefinitionDTO } from '@models/sun-outage-availability-definition-dto.model';
import { of } from 'rxjs';
import { ResourcesService } from './resources.service';

describe('ResourcesService', () => {
  let service: ResourcesService;
  let apiServiceSpy: { create: jasmine.Spy };
  let fakeResources: ResourceLightDTO[];
  let fakeResourcesWithProfile: ResourceWithProfileAndEventLightDTO[];

  beforeEach(() => {
    fakeResources = [
      {
        id: 1111487,
        version: 10,
        type: 'NETWORK',
        code: 'UEFA 2023-2024 AMERICAS EQUIP',
        codeLocal: 'UEFA 2023-2024 AMERICAS EQUIP',
        name: 'UEFA 2023-2024 AMERICAS EQUIP',
        externalName: null,
        blackListed: false,
      },
      {
        id: 1111715,
        version: 7,
        type: 'NETWORK',
        code: 'UEFA 2024 UCL DIGICON 1',
        codeLocal: 'UEFA 2024 UCL DIGICON 1',
        name: 'UEFA 2024 UCL DIGICON 1',
        externalName: null,
        blackListed: false,
      },
    ];

    fakeResourcesWithProfile = [
      {
        id: 35054,
        version: 0,
        type: 'NETWORK',
        code: 'AI08GNVA_TO_MOD01ASAT_AVN(156205)',
        codeLocal: 'AI08GNVA_TO_MOD01ASAT_AVN(156205)',
        name: 'AI08GNVA_TO_MOD01ASAT_AVN',
        resourceProfile: {
          id: 104,
          version: 0,
          code: 'D2F_SERVICE',
          name: 'D2F Service',
          type: 'NETWORK',
          canHaveProduct: false,
        },
        event: null,
      },
      {
        id: 28826,
        version: 9,
        type: 'INPUT_OUTPUT',
        code: 'GNVE ZZEBU/GNVA1_AI09FAKE(30795)',
        codeLocal: 'GNVA1_AI09FAKE(30795)',
        name: 'AI09FAKE',
        resourceProfile: {
          id: 98,
          version: 0,
          code: 'D2F_PORT_IN',
          name: 'BC D2F Port Source',
          type: 'INPUT_OUTPUT',
          canHaveProduct: false,
        },
        event: null,
      },
    ];

    apiServiceSpy = jasmine.createSpyObj('ApiService', ['create']);
    service = new ResourcesService(apiServiceSpy as any);
  });
  it('should fetch resources', () => {
    apiServiceSpy.create.and.returnValue(of(fakeResources));

    service.getFilteredResources('').subscribe((res) => {
      expect(res).toEqual(fakeResources);
    }, fail);
  });

  it('should fetch resources by transmissions ID', () => {
    apiServiceSpy.create.and.returnValue(of(fakeResourcesWithProfile));

    service.getResourcesByTransmissionIdList([1]).subscribe((res) => {
      expect(res).toEqual(fakeResourcesWithProfile);
    }, fail);
  });

  it('should fetch satellites', () => {
    const searchCriteria = {
      first: 0,
      max: 1000,
      orders: [
        {
          identifier: 'code',
          asc: true,
        },
      ],
      terms: [
        {
          identifier: null,
          value: null,
          type: 'And',
          terms: [
            {
              identifier: 'status',
              value: ['ACTIVE'],
              type: 'In',
            },
          ],
        },
      ],
      relations: [
        {
          type: 'Join',
          relationEntity: 'resourceProfile',
          terms: [
            {
              identifier: 'code',
              value: 'SAT',
              type: 'Eq',
              privateOperator: true,
            },
          ],
          subJoin: null,
          joinType: 'INNER',
        },
      ],
      values: {},
    };
    const fakeSatellitesList = [
      {
        id: 18086,
        version: 2,
        type: 'CONNECTABLE',
        code: 'ABS',
        codeLocal: 'ABS',
        name: 'ABS',
        externalName: 'ABS',
        blackListed: false,
      },
    ];
    apiServiceSpy.create.and.returnValue(of(fakeSatellitesList));

    service.getSatellites().subscribe((res) => {
      expect(res).toEqual(fakeSatellitesList);
    }, fail);

    expect(apiServiceSpy.create).toHaveBeenCalledTimes(1);
    expect(apiServiceSpy.create).toHaveBeenCalledWith('/resources/search', {
      body: searchCriteria,
    });
  });

  it('should save sun outages by satellite id', () => {
    const fakeSaveResponse = [
      'There is no dish between the broadcast center AM-44 and the satellite EU7B.',
    ];
    const fakeListToSave: SunOutageAvailabilityDefinitionDTO[] = [
      {
        resourceCode: 'AM-44',
        availabilityDefinitionBean: {
          id: null,
          version: 0,
          entityTrackerIdBean: null,
          type: 'UNAVAILABILITY',
          description: 'SUN OUTAGE',
          startDate: [2024, 4, 18, 18, 4],
          endDate: [2024, 4, 18, 20, 4],
          transponderDetail: null,
          transponderInfo: null,
          entityNameEnum: null,
        },
        availabilityDefinition: {
          id: null,
          version: 0,
          entityTrackerIdBean: null,
          type: 'UNAVAILABILITY',
          description: 'SUN OUTAGE',
          startDate: [2024, 4, 18, 18, 4],
          endDate: [2024, 4, 18, 20, 4],
          transponderDetail: null,
          transponderInfo: null,
          entityNameEnum: null,
        },
      },
    ];

    apiServiceSpy.create.and.returnValue(of(fakeSaveResponse));

    service
      .saveSunOutageBySatelliteId(23573, fakeListToSave)
      .subscribe((res) => {
        expect(res).toEqual(fakeSaveResponse);
      }, fail);

    expect(apiServiceSpy.create).toHaveBeenCalledTimes(1);
    expect(apiServiceSpy.create).toHaveBeenCalledWith(
      '/resources/sun-outages/satellite/23573',
      {
        body: fakeListToSave,
      }
    );
  });
});
