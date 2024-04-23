import { EntityType } from '@constants/entities';
import { EntityAuditDTO } from '@models/entity-audit-dto.model';
import { of } from 'rxjs';
import { AuditsService } from './audits.service';

describe('AuditsService', () => {
  let service: AuditsService;
  let apiServiceSpy: { read: jasmine.Spy };
  let fakeAuditList: EntityAuditDTO[];

  beforeEach(() => {
    fakeAuditList = [
      {
        user: 'External',
        time: [2023, 10, 2, 13, 20, 4],
        revision: 118006299,
        actionPerformed:
          'Create incident 103,973, Transmission 00-1 added to incident 103,973, Resource GNVE ZZEBU added to incident 103,973',
        technicalComplements: [{ key: 'INCIDENT_ID', value: '103973' }],
        entityAffectedName: null,
        entityAffectedId: null,
      },
      {
        user: 'External',
        time: [2023, 10, 2, 13, 20, 16],
        revision: 118006300,
        actionPerformed: 'Synchronized in XRM: Incident created: 103973. ',
        technicalComplements: null,
        entityAffectedName: 'INCIDENT',
        entityAffectedId: 103973,
      },
      {
        user: 'External',
        time: [2023, 10, 2, 15, 6, 56],
        revision: 118006313,
        actionPerformed: 'Add attachment "download"',
        technicalComplements: null,
        entityAffectedName: 'ATTACHMENT',
        entityAffectedId: 1011164,
      },
    ];
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['read']);
    service = new AuditsService(apiServiceSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch audits log by entity', () => {
    apiServiceSpy.read.and.returnValue(of(fakeAuditList));

    service
      .getAuditsByEntityId(EntityType.INCIDENT, 65538)
      .subscribe((res) => expect(res).toEqual(fakeAuditList), fail);
  });
});
