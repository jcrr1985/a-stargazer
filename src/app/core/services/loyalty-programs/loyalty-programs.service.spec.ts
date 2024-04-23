import { DiscountType } from '@constants/discount-types';
import { LoyaltyProgramDTO } from '@models/loyalty-program-dto.model';
import { of } from 'rxjs';
import { LoyaltyProgramsService } from './loyalty-programs.service';

describe('LoyaltyProgramsService', () => {
  let service: LoyaltyProgramsService;
  let apiServiceSpy: { read: jasmine.Spy; create: jasmine.Spy };
  let fakeLoyaltyPrograms: LoyaltyProgramDTO[];

  beforeEach(() => {
    fakeLoyaltyPrograms = [
      {
        id: 5,
        version: 2,
        organization: {
          id: 7553,
          version: 374,
          code: 'IRPRES',
          name: 'Press TV',
          type: 'NMEMB',
          isActive: true,
          isPoRefMandatory: false,
          financialStatusType: 'BL',
          invoice: false,
        },
        service: {
          version: 0,
          id: 1688,
          sequence: 100,
          keyCode: 'SERVICE@SPEV',
          code: 'SPEV',
          isoCode: null,
          externalCode: null,
          label: 'Special Events',
          extView: true,
          externalLabel: null,
          itemStatus: 'ACTIVE',
          businessKey: 'SERVICE@SPEV',
          new: false,
        },
        product: null,
        startDate: [2016, 2, 1],
        endDate: [2017, 12, 31],
        startTime: null,
        endTime: null,
        discount: 20.0,
        accumulated: false,
        discountType: DiscountType.PERCENT,
        isModified: false,
        isRemoved: false,
        isOssOrigin: 'BOTH',
        isWithAssociatedProduct: 'BOTH',
      },
    ];
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['read', 'create']);
    service = new LoyaltyProgramsService(apiServiceSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all loyalty programs', () => {
    apiServiceSpy.read.and.returnValue(of(fakeLoyaltyPrograms));

    service.getAllLoyaltyPrograms().subscribe((res) => {
      expect(res).toEqual(fakeLoyaltyPrograms);
    }, fail);

    expect(apiServiceSpy.read).toHaveBeenCalledTimes(1);
    expect(apiServiceSpy.read).toHaveBeenCalledWith('/loyalty-program');
  });

  it('should save all loyalty programs', () => {
    const fakeListToSave: LoyaltyProgramDTO[] = [
      {
        id: 5,
        version: 2,
        entityTrackerIdBean: null,
        service: {
          id: 1688,
          version: 0,
          entityTrackerIdBean: null,
          code: 'SPEV',
          isoCode: null,
          externalCode: null,
          label: 'Special Events',
          sequence: 100,
          extView: true,
          externalLabel: null,
          itemStatus: 'ACTIVE',
          isModified: false,
          keyCode: 'SERVICE@SPEV',
          isRemoved: false,
          name: 'Special Events',
          entityNameEnum: null,
        },
        product: null,
        organization: {
          id: 7553,
          version: 374,
          entityTrackerIdBean: null,
          code: 'IRPRES',
          name: 'Press TV',
          type: 'NMEMB',
          isActive: true,
          isPoRefMandatory: false,
          financialStatusType: 'BL',
          invoice: false,
          entityNameEnum: null,
        },
        discountType: DiscountType.PERCENT,
        discount: 22.0,
        accumulated: false,
        startTime: null,
        endTime: null,
        startDate: [2016, 2, 1],
        endDate: [2017, 12, 31],
        isOssOrigin: 'BOTH',
        isWithAssociatedProduct: 'BOTH',
        isModified: true,
        isRemoved: false,
        entityNameEnum: null,
      },
    ];
    apiServiceSpy.create.and.returnValue(of(fakeLoyaltyPrograms));

    service.saveLoyaltyProgramList(fakeListToSave).subscribe((res) => {
      expect(res).toEqual(fakeLoyaltyPrograms);
    }, fail);

    expect(apiServiceSpy.create).toHaveBeenCalledTimes(1);
    expect(apiServiceSpy.create).toHaveBeenCalledWith('/loyalty-program/list', {
      body: fakeListToSave,
    });
  });
});
