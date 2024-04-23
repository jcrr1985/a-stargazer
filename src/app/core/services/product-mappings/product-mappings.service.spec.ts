import { ProductMapping } from '@models/product-mapping.model';
import { of } from 'rxjs';
import { ProductMappingsService } from './product-mappings.service';

describe('ProductMappingsService', () => {
  let service: ProductMappingsService;
  let apiServiceSpy: { read: jasmine.Spy; create: jasmine.Spy };
  let fakeProductMappings: ProductMapping[];

  beforeEach(() => {
    fakeProductMappings = [
      {
        id: 2,
        version: 0,
        service: {
          version: 0,
          id: 1694,
          sequence: 120,
          keyCode: 'SERVICE@UNINSE',
          code: 'UNINSE',
          isoCode: null,
          externalCode: null,
          label: 'Unilaterals (not SE)',
          extView: true,
          externalLabel: null,
          itemStatus: 'ACTIVE',
          businessKey: 'SERVICE@UNINSE',
          new: false,
        },
        product: {
          id: 64,
          version: 2,
          code: 'EDIT',
          name: 'Edit',
          productType: 'FACILITY',
          productCategory: 'NONTRANSMISSION',
          isMainProduct: true,
          isAssociatedProduct: true,
          associatedProduct: true,
          mainProduct: true,
        },
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
        isModified: false,
        isRemoved: false,
      },
    ];
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['read', 'create']);
    service = new ProductMappingsService(apiServiceSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all loyalty programs', () => {
    apiServiceSpy.read.and.returnValue(of(fakeProductMappings));

    service.getAllProductMappingss().subscribe((res) => {
      expect(res).toEqual(fakeProductMappings);
    }, fail);

    expect(apiServiceSpy.read).toHaveBeenCalledTimes(1);
    expect(apiServiceSpy.read).toHaveBeenCalledWith('/product-mapping');
  });

  it('should save all loyalty programs', () => {
    const fakeListToSave: ProductMapping[] = [
      {
        id: 2,
        version: 0,
        entityTrackerIdBean: null,
        service: {
          id: 1694,
          version: 0,
          entityTrackerIdBean: null,
          code: 'UNINSE',
          isoCode: null,
          externalCode: null,
          label: 'Unilaterals (not SE)',
          sequence: 120,
          extView: true,
          externalLabel: null,
          itemStatus: 'ACTIVE',
          isModified: false,
          keyCode: 'SERVICE@UNINSE',
          isRemoved: false,
          name: 'Unilaterals (not SE)',
          entityNameEnum: null,
        },
        product: {
          id: 108,
          version: 2,
          entityTrackerIdBean: null,
          code: 'BETA D',
          name: 'BETA D',
          productType: 'FACILITY',
          productCategory: 'NONTRANSMISSION',
          isMainProduct: false,
          isAssociatedProduct: true,
          price: {
            id: 108,
            version: 2,
            amount: 0.0,
            currency: {
              id: 170,
              version: 0,
              entityTrackerIdBean: null,
              code: 'EUR',
              name: 'EUR',
              entityNameEnum: null,
            },
            currencyCode: 'EUR',
          },
          priceUnit: 'UNIT',
          description: null,
          invoiceOrganization: {
            id: 12791,
            version: 211,
            entityTrackerIdBean: null,
            code: 'ZZEBU',
            name: 'European Broadcasting Union/Union EuropÃ©enne de RadiotÃ©lÃ©vision',
            type: null,
            isActive: false,
            isPoRefMandatory: false,
            financialStatusType: null,
            invoice: false,
            entityNameEnum: null,
          },
          deadline: null,
          quantity: 0,
          entityNameEnum: null,
        },
        eventType: {
          id: 3137,
          version: 220,
          entityTrackerIdBean: null,
          code: 'PROG',
          isoCode: null,
          externalCode: null,
          label: 'Programme',
          sequence: 8,
          extView: true,
          externalLabel: null,
          itemStatus: 'ACTIVE',
          isModified: false,
          keyCode: 'EVENT_TYPE@PROG',
          isRemoved: false,
          name: 'Programme',
          entityNameEnum: null,
        },
        isModified: true,
        isRemoved: false,
        entityNameEnum: null,
      },
      {
        id: 38,
        version: 0,
        entityTrackerIdBean: null,
        service: {
          id: 1694,
          version: 0,
          entityTrackerIdBean: null,
          code: 'UNINSE',
          isoCode: null,
          externalCode: null,
          label: 'Unilaterals (not SE)',
          sequence: 120,
          extView: true,
          externalLabel: null,
          itemStatus: 'ACTIVE',
          isModified: false,
          keyCode: 'SERVICE@UNINSE',
          isRemoved: false,
          name: 'Unilaterals (not SE)',
          entityNameEnum: null,
        },
        product: {
          id: 157,
          version: 1,
          entityTrackerIdBean: null,
          code: 'POOL ACCESS',
          name: 'Pool Access',
          productType: 'FACILITY',
          productCategory: 'NONTRANSMISSION',
          isMainProduct: true,
          isAssociatedProduct: true,
          price: null,
          priceUnit: null,
          description: null,
          invoiceOrganization: null,
          deadline: null,
          quantity: 0,
          entityNameEnum: null,
        },
        eventType: {
          id: 3137,
          version: 220,
          entityTrackerIdBean: null,
          code: 'PROG',
          isoCode: null,
          externalCode: null,
          label: 'Programme',
          sequence: 8,
          extView: true,
          externalLabel: null,
          itemStatus: 'ACTIVE',
          isModified: false,
          keyCode: 'EVENT_TYPE@PROG',
          isRemoved: false,
          name: 'Programme',
          entityNameEnum: null,
        },
        isModified: false,
        isRemoved: true,
        entityNameEnum: null,
      },
      {
        id: null,
        version: 0,
        entityTrackerIdBean: null,
        service: {
          id: 1691,
          version: 0,
          entityTrackerIdBean: null,
          code: 'DEPA',
          isoCode: null,
          externalCode: null,
          label: 'Dedicated packages',
          sequence: 110,
          extView: true,
          externalLabel: null,
          itemStatus: 'ACTIVE',
          isModified: false,
          keyCode: 'SERVICE@DEPA',
          isRemoved: false,
          name: 'Dedicated packages',
          entityNameEnum: null,
        },
        product: {
          id: 108,
          version: 2,
          entityTrackerIdBean: null,
          code: 'BETA D',
          name: 'BETA D',
          productType: 'FACILITY',
          productCategory: 'NONTRANSMISSION',
          isMainProduct: false,
          isAssociatedProduct: true,
          price: {
            id: 1,
            version: 0,
            amount: 0.0,
            currency: {
              id: 170,
              version: 0,
              entityTrackerIdBean: null,
              code: 'EUR',
              name: 'EUR',
              entityNameEnum: null,
            },
            currencyCode: 'EUR',
          },
          priceUnit: 'UNIT',
          description: null,
          invoiceOrganization: {
            id: 12791,
            version: 211,
            entityTrackerIdBean: null,
            code: 'ZZEBU',
            name: 'European Broadcasting Union/Union EuropÃ©enne de RadiotÃ©lÃ©vision',
            type: null,
            isActive: false,
            isPoRefMandatory: false,
            financialStatusType: null,
            invoice: false,
            entityNameEnum: null,
          },
          deadline: null,
          quantity: 0,
          entityNameEnum: null,
        },
        eventType: {
          id: 3131,
          version: 0,
          entityTrackerIdBean: null,
          code: 'NEWS',
          isoCode: null,
          externalCode: null,
          label: 'News (Planned)',
          sequence: 6,
          extView: true,
          externalLabel: null,
          itemStatus: 'ACTIVE',
          isModified: false,
          keyCode: 'EVENT_TYPE@NEWS',
          isRemoved: false,
          name: 'News (Planned)',
          entityNameEnum: null,
        },
        isModified: true,
        isRemoved: false,
        entityNameEnum: null,
      },
    ];
    apiServiceSpy.create.and.returnValue(of(fakeProductMappings));

    service.saveProductMappingList(fakeListToSave).subscribe((res) => {
      expect(res).toEqual(fakeProductMappings);
    }, fail);

    expect(apiServiceSpy.create).toHaveBeenCalledTimes(1);
    expect(apiServiceSpy.create).toHaveBeenCalledWith('/product-mapping/list', {
      body: fakeListToSave,
    });
  });
});
