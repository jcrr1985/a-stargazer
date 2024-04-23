import { TransmissionLightDTO } from '@models/transmission-light-dto.model';
import { of } from 'rxjs';
import { TransmissionsService } from './transmissions.service';

describe('TransmissionsService', () => {
  let service: TransmissionsService;
  let apiServiceSpy: { create: jasmine.Spy };
  let fakeTransmissions: TransmissionLightDTO[];

  beforeEach(() => {
    fakeTransmissions = [
      {
        id: 4104,
        version: 13,
        no: '00-1',
        title: 'UEL MD11 - Highlights',
        description: 'Start: 0900 GMT',
        startDate: [2016, 4, 8, 8, 45],
        endDate: [2016, 4, 8, 10, 0],
        status: 'COMPLETED',
        event: {
          id: 10388,
          version: 7,
          periodBegin: [2015, 8, 6],
          periodEnd: [2016, 6, 1],
          no: 35339,
          description: 'FOOTBALL: UEFA Distribution over Africa',
          eventType: {
            id: 3137,
            version: 220,
            sequence: 8,
            keyCode: 'EVENT_TYPE@PROG',
            code: 'PROG',
            externalCode: null,
            label: 'Programme',
            extView: true,
            externalLabel: null,
            itemStatus: 'ACTIVE',
          },
        },
      },
      {
        id: 368585,
        version: 2,
        no: '00-2',
        title: 'UCL MAGAZINE SHOW#9',
        description: 'MD4 PREVIEW',
        startDate: [1900, 1, 27, 11, 45],
        endDate: [1900, 1, 27, 13, 0],
        status: 'COMPLETED',
        event: {
          id: 14723,
          version: 3,
          periodBegin: [2017, 8, 1],
          periodEnd: [2018, 6, 4],
          no: 41525,
          description: 'FOOTBALL: UCL MAGAZINE PROGRAMS 2017-2018',
          eventType: {
            id: 3137,
            version: 220,
            sequence: 8,
            keyCode: 'EVENT_TYPE@PROG',
            code: 'PROG',
            externalCode: null,
            label: 'Programme',
            extView: true,
            externalLabel: null,
            itemStatus: 'ACTIVE',
          },
        },
      },
    ];

    apiServiceSpy = jasmine.createSpyObj('ApiService', ['create']);
    service = new TransmissionsService(apiServiceSpy as any);
  });
  it('should fetch resources', () => {
    apiServiceSpy.create.and.returnValue(of(fakeTransmissions));

    service.getFilteredTransmissions('').subscribe((res) => {
      expect(res).toEqual(fakeTransmissions);
    }, fail);
  });
});
