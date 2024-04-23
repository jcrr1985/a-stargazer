import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  DiscountManager,
  DiscountManagerComponent,
} from './discount-manager.component';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { DomainItem } from '@models/domain-item.model';
import { OrganizationEmbeddedDTO } from '@models/organization-embedded-dto.model';
import { LoyaltyProgramsService } from '@services/loyalty-programs/loyalty-programs.service';
import { DiscountManagerDialogComponent } from '@shared/components/discount-manager-dialog/discount-manager-dialog.component';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { of } from 'rxjs';
import { RowEvent } from 'table-generator';

describe('DiscountManagerComponent', () => {
  let component: DiscountManagerComponent;
  let fixture: ComponentFixture<DiscountManagerComponent>;
  let mockLoyaltyProgramsService: jasmine.SpyObj<LoyaltyProgramsService>;
  let dialog: MatDialog;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('LoyaltyProgramsService', [
      'getOrganizations',
      'getProducts',
      'getAllLoyaltyPrograms',
    ]);

    await TestBed.configureTestingModule({
      declarations: [DiscountManagerComponent],
      imports: [MatDialogModule, TranslateTestingModule.withTranslations({})],
      providers: [{ provide: LoyaltyProgramsService, useValue: spy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountManagerComponent);
    component = fixture.componentInstance;
    mockLoyaltyProgramsService = TestBed.inject(
      LoyaltyProgramsService
    ) as jasmine.SpyObj<LoyaltyProgramsService>;

    dialog = TestBed.inject(MatDialog);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call LoyaltyProgramsService methods and set properties on init', () => {
    const mockData = {
      organizations: [],
      products: [],
      loyaltyPrograms: [{ startDate: '2022-01-01', endDate: '2022-12-31' }],
    };

    const mockOrganizationEmbeddedDTO = {
      code: 'ORG123',
      name: 'Organization Name',
      type: 'Type1',
      isActive: true,
      isPoRefMandatory: false,
      financialStatusType: 'Status1',
      invoice: true,
    };

    const mockDomainItem: DomainItem = {
      id: 1,
      sequence: 1,
      keyCode: 'KEY1',
      code: 'CODE1',
      isoCode: 'ISO1',
      externalCode: 'EXT1',
      label: 'Label1',
      extView: true,
      externalLabel: 'ExtLabel1',
      itemStatus: 'Status1',
      name: 'Name1',
    };

    const mockPrice = {
      amount: 100,
      currency: {},
      negative: false,
      zero: false,
      positive: true,
      notZero: true,
      currencyCode: 'USD',
    };

    const mockProductEmbeddedDTO = {
      price: mockPrice,
      priceUnit: 'Unit1',
      invoiceOrganization: {},
      deadline: null,
      quantity: 10,
      description: 'Description1',
      code: 1,
      name: 2,
      productCategory: 1,
      isMainProduct: true,
      isAssociatedProduct: true,
      productType: 1,
    };

    const mockLoyaltyProgramDTO: any = {
      id: 1,
      organization: mockOrganizationEmbeddedDTO,
      service: mockDomainItem,
      product: {},
      startDate: '2022-01-01',
      endDate: '2022-12-31',
      startTime: '09:00',
      endTime: '17:00',
      discount: 10,
      accumulated: true,
      discountType: {},
      isOssOrigin: 'YES',
      isWithAssociatedProduct: 'NO',
    };

    mockLoyaltyProgramsService.getOrganizations.and.returnValue(
      of(mockData.organizations)
    );
    mockLoyaltyProgramsService.getProducts.and.returnValue(
      of(mockData.products)
    );
    mockLoyaltyProgramsService.getAllLoyaltyPrograms.and.returnValue(
      of(mockData.loyaltyPrograms as any)
    );

    component.ngOnInit();

    expect(mockLoyaltyProgramsService.getOrganizations).toHaveBeenCalled();
    expect(mockLoyaltyProgramsService.getProducts).toHaveBeenCalled();
    expect(mockLoyaltyProgramsService.getAllLoyaltyPrograms).toHaveBeenCalled();

    expect(component.data).not.toBeNull();

    expect(component.dialogOrganizations).toEqual(mockData.organizations);
    expect(component.dialogProducts).toEqual(mockData.products);
  });

  it('should call next and complete on _onDestroy$ when ngOnDestroy is called', () => {
    spyOn(component._onDestroy$, 'next');
    spyOn(component._onDestroy$, 'complete');

    component.ngOnDestroy();

    expect(component._onDestroy$.next).toHaveBeenCalled();
    expect(component._onDestroy$.complete).toHaveBeenCalled();
  });

  it('should set clickedRow to null and then to the clicked row when onRowClicked is called', () => {
    const mockRowEvent: RowEvent<any> = { row: {} };

    component.onRowClicked(mockRowEvent);

    expect(component.clickedRow).toBe(mockRowEvent.row);
  });

  it('should set clickedRow to null when onRowClicked is called with a null row', () => {
    const mockRowEvent: RowEvent<any> = { row: null };

    component.onRowClicked(mockRowEvent);

    expect(component.clickedRow).toBeNull();
  });

  it('should call openItemDialog and update data when onRowDoubleClicked is called', async () => {
    const mockRow: any = {};
    const mockRowEvent: RowEvent<any> = {
      row: mockRow,
    };
    const mockEdited = { a: 1 };

    spyOn(component, 'openItemDialog').and.returnValue(
      Promise.resolve(mockEdited)
    );

    await component.onRowDoubleClicked(mockRowEvent);

    expect(component.openItemDialog).toHaveBeenCalledWith(mockRow);
  });

  it('should have the correct columns configuration', () => {
    expect(component.columnsConfiguration).toEqual({
      accumulated: {
        translateKey: 'accumulated',
        type: 'checkbox',
      },
      organization: {
        translateKey: 'organization',
        type: 'object',
        displayWith: (organization: OrganizationEmbeddedDTO) =>
          organization?.name,
      },
      product: {
        translateKey: 'product',
        type: 'string',
      },
      discountType: {
        translateKey: 'discountType',
        type: 'string',
      },
      discount: {
        translateKey: 'discount',
        type: 'string',
      },
      startDate: {
        translateKey: 'startDate',
        type: 'string',
      },
      endDate: {
        translateKey: 'endDate',
        type: 'string',
      },

      offPeakStart: {
        translateKey: 'offPeakStart',
        type: 'string',
      },

      offPeakEnd: {
        translateKey: 'offPeakEnd',
        type: 'string',
      },
      isOssOrigin: {
        translateKey: 'isOssOrigin',
        type: 'boolean',
      },

      isWithAssociatedProduct: {
        translateKey: 'isWithAssociatedProduct',
        type: 'string',
      },
    });
  });

  it('should open the dialog with the correct data when openItemDialog is called', () => {
    const mockDiscountManager: DiscountManager = {
      id: 1,
      accumulated: true,
      organization: 'Test Organization',
      product: 'Test Product',
      discountType: 'Test Discount Type',
      discount: 'Test Discount',
      discountStart: [10, 10, 2018],
      discountEnd: [11, 11, 2019],
      offPeakStart: '00:00',
      offPeakEnd: '01:00',
      isOssOrigin: true,
      isWithAssociation: 'Test Association',
      items: [],
    };
    const mockDialogRef = { afterClosed: () => of(null) };
    spyOn(dialog, 'open').and.returnValue(mockDialogRef as any);
    spyOn(mockDialogRef, 'afterClosed');

    enum DiscountType {
      percentage = 'PERCENTAGE',
      fixed = 'FIXED',
    }

    component.openItemDialog(mockDiscountManager);

    expect(dialog.open).toHaveBeenCalledWith(DiscountManagerDialogComponent, {
      width: 'fit-content',
      disableClose: true,
      data: {
        data: component.data,
        row: mockDiscountManager,
        editedIndex: component.editedIndex,
        organizations: component.dialogOrganizations,
        products: component.dialogProducts,
        discountType: [DiscountType.fixed, DiscountType.percentage],
        offPeakStart: component.offPeakStart,
        offPeakEnd: component.offPeakEnd,
      },
    });
    expect(mockDialogRef.afterClosed).toHaveBeenCalled();
  });

  it('should unsubscribe when _onDestroy$ emits', () => {
    const mockDiscountManager: DiscountManager = {
      id: 1,
      accumulated: true,
      organization: 'Test Organization',
      product: 'Test Product',
      discountType: 'Test Discount Type',
      discount: 'Test Discount',
      discountStart: [10, 10, 2018],
      discountEnd: [11, 11, 2019],
      offPeakStart: '00:00',
      offPeakEnd: '01:00',
      isOssOrigin: true,
      isWithAssociation: 'Test Association',
      items: [],
    };
    const mockDialogRef = { afterClosed: () => of(null) };
    spyOn(dialog, 'open').and.returnValue(mockDialogRef as any);
    const afterClosedSpy = spyOn(mockDialogRef, 'afterClosed');

    component.openItemDialog(mockDiscountManager);

    component._onDestroy$.next();

    expect(afterClosedSpy).not.toHaveBeenCalled();
  });
});
