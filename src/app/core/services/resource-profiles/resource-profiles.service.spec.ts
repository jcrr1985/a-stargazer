import { ResourceProfile } from '@models/resource-profile.model';
import { of } from 'rxjs';
import { ResourceProfilesService } from './resource-profiles.service';

describe('ResourceProfilesService', () => {
  let service: ResourceProfilesService;
  let apiServiceSpy: { create: jasmine.Spy };
  let fakeResourceProfiles: ResourceProfile[];

  beforeEach(() => {
    fakeResourceProfiles = [
      {
        version: 1,
        id: 38,
        code: 'ASISW',
        name: 'ASI Switcher',
        type: 'CONNECTABLE',
        status: 'ACTIVE',
        mobileResource: true,
        contacts: false,
        canHaveProduct: false,
        input: true,
        output: true,
        required: false,
        locked: false,
        allowSynopsisNote: false,
        abbreviation: null,
        overallBitrateManagement: false,
        businessKey: 'ASISW',
        new: false,
      },
      {
        version: 2,
        id: 189,
        code: 'AUDIO CODEC',
        name: 'Audio Codec',
        type: 'CONNECTABLE',
        status: 'ACTIVE',
        mobileResource: false,
        contacts: true,
        canHaveProduct: false,
        input: false,
        output: false,
        required: false,
        locked: false,
        allowSynopsisNote: false,
        abbreviation: null,
        overallBitrateManagement: false,
        businessKey: 'AUDIO CODEC',
        new: false,
      },
    ];
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['create']);
    service = new ResourceProfilesService(apiServiceSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all resource profiles', () => {
    apiServiceSpy.create.and.returnValue(of(fakeResourceProfiles));

    service.getResourceProfiles().subscribe((res) => {
      expect(res).toEqual(fakeResourceProfiles);
    }, fail);

    expect(apiServiceSpy.create).toHaveBeenCalledTimes(1);
    expect(apiServiceSpy.create).toHaveBeenCalledWith(
      '/resource-profiles/search',
      {
        body: {
          orders: [
            {
              identifier: 'code',
              asc: true,
            },
          ],
          terms: [],
          relations: [],
          values: {},
        },
      }
    );
  });
});
