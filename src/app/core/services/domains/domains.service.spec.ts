import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Role } from '@constants/app-roles';
import { DomainListsResponseDTO } from '@models/domain-lists-response-dto.model';
import { DomainMapping } from '@models/domain-mapping.model';
import { DomainParameter } from '@models/domain-parameter.model';
import { ApiService } from '@services/api/api.service';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { of } from 'rxjs';
import { DomainsService } from './domains.service';

describe('DomainsService', () => {
  let service: DomainsService;
  let apiService: ApiService;
  let domainLists: DomainListsResponseDTO;
  let domainMappings: DomainMapping[] = [];
  let domainParameters: DomainParameter[] = [];

  beforeEach(() => {
    domainParameters = [
      {
        version: 1103,
        id: 2,
        keyCode: 'PROPERTY_GROUP',
        code: 'PROPERTY_GROUP',
        label: 'Property Group',
        groupCode: 'PROPERTY_PARAMETER',
        externalLabel: null,
        domainStatus: 'ACTIVE',
        items: [
          {
            version: 0,
            id: 2,
            sequence: 1,
            keyCode: 'PROPERTY_GROUP@GENERAL',
            code: 'GENERAL',
            isoCode: null,
            externalCode: null,
            label: 'General',
            extView: true,
            externalLabel: null,
            itemStatus: 'ACTIVE',
            businessKey: 'PROPERTY_GROUP@GENERAL',
            new: false,
          },
        ],
        isModified: false,
        isRemoved: false,
        businessKey: 'PROPERTY_GROUP',
        new: false,
      },
    ];
    domainMappings = [
      {
        version: 0,
        id: 2,
        mappingType: 'COMM_BITRATE',
        item: {
          version: 355,
          id: 515,
          sequence: 10,
          keyCode: 'COMM_BITRATE@5SD',
          code: '5SD',
          isoCode: null,
          externalCode: '5SD',
          label: '5 Mbps SD',
          extView: false,
          externalLabel: '5 Mbps SD',
          itemStatus: 'ACTIVE',
          businessKey: 'COMM_BITRATE@5SD',
          new: false,
        },
        mappedItems: [
          {
            version: 0,
            id: 3110,
            item: {
              version: 0,
              id: 299,
              sequence: 1,
              keyCode: 'D2F_SLOT@10',
              code: '10',
              isoCode: null,
              externalCode: null,
              label: '10 slots',
              extView: true,
              externalLabel: null,
              itemStatus: 'ACTIVE',
              businessKey: 'D2F_SLOT@10',
              new: false,
            },
            businessKey: '3110',
            new: false,
          },
        ],
        isModified: false,
        isRemoved: false,
        businessKey: '2',
        new: false,
      },
    ];
    domainLists = { domainMappings, domainParameters };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, LoggerTestingModule],
      providers: [
        {
          provide: ApiService,
          useValue: {
            read: (url: string, httpOptions?: any) => of(domainLists),
            update: (url: string, httpOptions?: any) => of(domainLists),
          },
        },
      ],
    });
    apiService = TestBed.inject(ApiService);
    service = TestBed.inject(DomainsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all domain parameters', () => {
    spyOn(apiService, 'read').and.returnValue(of(domainParameters));

    service
      .getDomains()
      .subscribe((res) => expect(res).toEqual(domainParameters), fail);

    expect(apiService.read).toHaveBeenCalledWith('/domains');
  });

  it('should fetch domains', () => {
    spyOn(apiService, 'read').and.callThrough();

    service
      .listAll()
      .subscribe((res) => expect(res).toEqual(domainLists), fail);

    expect(apiService.read).toHaveBeenCalledWith('/domains/list-all');
  });

  it('should save domains', () => {
    spyOn(apiService, 'update').and.callThrough();

    service
      .saveAll(domainLists)
      .subscribe((res) => expect(res).toEqual(domainLists), fail);

    expect(apiService.update).toHaveBeenCalledWith('/domains/save-all', {
      body: domainLists,
      headers: { ROLES: Object.values(Role).join() },
    });
  });
});
