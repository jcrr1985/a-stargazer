import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DomainItem } from '@models/domain-item.model';
import { DomainParameter } from '@models/domain-parameter.model';
import { SharedModule } from '@shared/shared.module';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { of } from 'rxjs';
import { RowActionEvent, TableGeneratorComponent } from 'table-generator';
import {
  Actions,
  DomainParametersComponent,
  TableId,
} from './domain-parameters.component';

describe('DomainParametersComponent', () => {
  let component: DomainParametersComponent;
  let dialogService: MatDialog;
  let fixture: ComponentFixture<DomainParametersComponent>;
  let domainParameters: DomainParameter[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DomainParametersComponent, TableGeneratorComponent],
      imports: [
        MatDialogModule,
        NoopAnimationsModule,
        SharedModule,
        TranslateTestingModule.withTranslations({ en: {} }),
      ],
      providers: [
        {
          provide: MatDialog,
          useValue: {
            open: (component: any, data: any) => ({
              afterClosed: () => of(true),
            }),
          },
        },
      ],
    }).compileComponents();
  });

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
    dialogService = TestBed.inject(MatDialog);
    fixture = TestBed.createComponent(DomainParametersComponent);
    component = fixture.componentInstance;
    component.data = [...domainParameters];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set clicked domain parameter as selected on row click', () => {
    component.onRowClicked({ row: domainParameters[0] });

    expect(component.selectedDomainParameter).toEqual(domainParameters[0]);
  });

  it('should add a domain parameter correctly with table action', fakeAsync(async () => {
    const fakeDomainParam: DomainParameter = {
      version: 1103,
      id: 2,
      keyCode: 'PROPERTY_GROUP',
      code: 'PROPERTY_GROUP',
      label: 'Property Group',
      groupCode: 'PROPERTY_PARAMETER',
      externalLabel: null,
      domainStatus: 'ACTIVE',
      items: [],
      isModified: true,
      isRemoved: false,
      businessKey: 'PROPERTY_GROUP',
      new: true,
    };
    component.selectedDomainParameter = domainParameters[0];
    spyOn(dialogService, 'open').and.returnValue({
      afterClosed: () => of(fakeDomainParam),
    } as any);

    await component.onTableAction(
      { action: { id: Actions.ADD_RECORD } },
      TableId.MAIN
    );
    fixture.detectChanges();

    expect(component.data).toContain(fakeDomainParam);
  }));

  it('should not add a domain parameter if other action is triggered', fakeAsync(async () => {
    const fakeDomainParam: DomainParameter = {
      version: 1103,
      id: 2,
      keyCode: 'PROPERTY_GROUP',
      code: 'PROPERTY_GROUP',
      label: 'Property Group',
      groupCode: 'PROPERTY_PARAMETER',
      externalLabel: null,
      domainStatus: 'ACTIVE',
      items: [],
      isModified: true,
      isRemoved: false,
      businessKey: 'PROPERTY_GROUP',
      new: true,
    };
    component.selectedDomainParameter = domainParameters[0];
    spyOn(dialogService, 'open').and.returnValue({
      afterClosed: () => of(fakeDomainParam),
    } as any);

    await component.onTableAction(
      { action: { id: Actions.EDIT_RECORD } },
      TableId.MAIN
    );
    fixture.detectChanges();

    expect(component.data).not.toContain(fakeDomainParam);
  }));

  it('should calculate next sequence id correctly', fakeAsync(async () => {
    const fakeDomainItem: DomainItem = {
      version: 0,
      id: 2,
      sequence: 79,
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
    };
    domainParameters[0].items.push(fakeDomainItem);
    component.selectedDomainParameter = domainParameters[0];

    const nextSequenceId = component.getNextSequenceId();

    expect(nextSequenceId).toEqual(80);
  }));

  it('should add a domain item correctly with table action', fakeAsync(async () => {
    const fakeItem: DomainItem = {
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
    };
    component.selectedDomainParameter = domainParameters[0];
    spyOn(dialogService, 'open').and.returnValue({
      afterClosed: () => of(fakeItem),
    } as any);

    await component.onTableAction(
      { action: { id: Actions.ADD_RECORD } },
      TableId.ITEMS
    );
    fixture.detectChanges();

    expect(component.data[0].items).toContain(fakeItem);
  }));

  it('should edit a domain Parameter correctly with table double click', fakeAsync(async () => {
    const modifiedItem: DomainParameter = {
      version: 1103,
      id: 2,
      keyCode: 'PROPERTY_GROUP',
      code: 'PROPERTY_GROUP',
      label: 'Property Group',
      groupCode: 'PROPERTY_PARAMETER',
      externalLabel: null,
      domainStatus: 'ACTIVE',
      items: [],
      isModified: true,
      isRemoved: false,
      businessKey: 'PROPERTY_GROUP',
      new: false,
    };
    component.selectedDomainParameter = domainParameters[0];
    spyOn(dialogService, 'open').and.returnValue({
      afterClosed: () => of(modifiedItem),
    } as any);

    await component.onRowDoubleClicked(
      { row: domainParameters[0] },
      TableId.MAIN
    );
    fixture.detectChanges();

    expect(component.data).toContain(modifiedItem);
  }));

  it('should edit a domain item correctly with table double click', fakeAsync(async () => {
    const modifiedItem: DomainItem = {
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
    };
    component.selectedDomainParameter = domainParameters[0];
    spyOn(dialogService, 'open').and.returnValue({
      afterClosed: () => of(modifiedItem),
    } as any);

    await component.onRowDoubleClicked(
      { row: domainParameters[0] },
      TableId.ITEMS
    );
    fixture.detectChanges();

    expect(component.data[0].items).toContain(modifiedItem);
  }));

  it('should remove an domain parameter correctly from table actions', fakeAsync(async () => {
    const deletedParameter: DomainParameter = {
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
    };
    component.selectedDomainParameter = domainParameters[0];

    await component.onRowAction(
      {
        action: { id: Actions.REMOVE_RECORD },
        row: domainParameters[0],
      } as RowActionEvent<DomainParameter> | RowActionEvent<DomainItem>,
      TableId.MAIN
    );
    fixture.detectChanges();

    expect(component.data).not.toContain(deletedParameter);
  }));

  it('should remove an item correctly from table actions', fakeAsync(async () => {
    const deletedItem: DomainItem = {
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
    };
    component.selectedDomainParameter = domainParameters[0];

    await component.onRowAction(
      {
        action: { id: Actions.REMOVE_RECORD },
        row: domainParameters[0],
      } as RowActionEvent<DomainParameter> | RowActionEvent<DomainItem>,
      TableId.ITEMS
    );
    fixture.detectChanges();

    expect(component.data[0].items).not.toContain(deletedItem);
  }));
});
