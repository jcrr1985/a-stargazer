import { Property } from '@models/property.model';
import { of } from 'rxjs';
import { PropertiesService } from './properties.service';

describe('PropertiesService', () => {
  let service: PropertiesService;
  let apiServiceSpy: { read: jasmine.Spy; create: jasmine.Spy };
  let fakeProperties: Property[];

  beforeEach(() => {
    fakeProperties = [
      {
        version: 0,
        id: 56,
        groupProperty: 'PROPERTY_GROUP@GENERAL',
        code: 'VIDEO_OCCUPIED_BANDWIDTH',
        name: 'Video Occupied Bandwidth',
        description: 'The video occupied bandwidth',
        inputConstraint: 'LIST',
        inputType: 'ENTITY',
        entityType: 'DOMAIN',
        entitySubType: 'VIDEO_OCCUPIED_BANDWIDTH',
        format: null,
        rangeBegin: null,
        rangeEnd: null,
        unit: null,
        defaultValue: null,
        sequenceProperty: 0,
        locked: false,
        isModified: false,
        isRemoved: false,
        businessKey: 'VIDEO_OCCUPIED_BANDWIDTH',
        new: false,
      },
    ];
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['read', 'create']);
    service = new PropertiesService(apiServiceSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all properties', () => {
    apiServiceSpy.read.and.returnValue(of(fakeProperties));

    service.getAllProperties().subscribe((res) => {
      expect(res).toEqual(fakeProperties);
    }, fail);

    expect(apiServiceSpy.read).toHaveBeenCalledTimes(1);
    expect(apiServiceSpy.read).toHaveBeenCalledWith('/properties');
  });

  it('should save properties list', () => {
    const fakeListToSave: Property[] = [
      {
        id: 2,
        version: 0,
        entityTrackerIdBean: null,
        groupProperty: 'PROPERTY_GROUP@GENERAL',
        code: 'COMM_BITRATE',
        name: 'Commercial Bitrate',
        description: 'The commercial bitrate',
        inputConstraint: 'RANGE',
        inputType: 'ENTITY',
        entityType: 'DOMAIN',
        entitySubType: 'COMM_BITRATE',
        format: null,
        rangeBegin: 0,
        rangeEnd: 100,
        unit: 'UNIT_MEASURE@METER',
        defaultValue: null,
        sequenceProperty: 0,
        locked: false,
        isModified: true,
        isRemoved: false,
        keyCode: 'COMM_BITRATE',
        entityNameEnum: null,
      },
    ];
    apiServiceSpy.create.and.returnValue(of(fakeProperties));

    service.savePropertyList(fakeListToSave).subscribe((res) => {
      expect(res).toEqual(fakeProperties);
    }, fail);

    expect(apiServiceSpy.create).toHaveBeenCalledTimes(1);
    expect(apiServiceSpy.create).toHaveBeenCalledWith('/properties/list', {
      body: fakeListToSave,
    });
  });
});
