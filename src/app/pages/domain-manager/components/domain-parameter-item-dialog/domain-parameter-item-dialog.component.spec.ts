import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { DomainItem } from '@models/domain-item.model';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';
import { DomainParameterItemDialogComponent } from './domain-parameter-item-dialog.component';

describe('DomainParameterItemDialogComponent', () => {
  let component: DomainParameterItemDialogComponent;
  let fixture: ComponentFixture<DomainParameterItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DomainParameterItemDialogComponent],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: (_: any) => {},
          },
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainParameterItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should patch form values from domainItem', () => {
    const testDomainItem: DomainItem = {
      version: 1,
      id: 2,
      keyCode: 'testKeyCode',
      code: 'testCode',
      isoCode: 'testIsoCode',
      externalCode: 'testExternalCode',
      label: 'testLabel',
      extView: false,
      externalLabel: 'testExternalLabel',
      itemStatus: 'ACTIVE',
      businessKey: 'testBusinessKey',
      new: false,
      sequence: 1,
    };

    component.data.domainItem = testDomainItem;

    component.ngOnInit();

    expect(component.form.get('code')!.value).toEqual('testCode');
    expect(component.form.get('isoCode')!.value).toEqual('testIsoCode');
  });

  it('should map inputDomainItem values to DomainItem', () => {
    const spy = spyOn(component.dialogRef, 'close');

    const testDomainItem: DomainItem = {
      version: 1,
      id: 2,
      keyCode: 'testKeyCode',
      code: 'testCode',
      isoCode: 'testIsoCode',
      externalCode: 'testExternalCode',
      label: 'testLabel',
      extView: false,
      externalLabel: 'testExternalLabel',
      itemStatus: 'ACTIVE',
      businessKey: 'testBusinessKey',
      new: false,
      sequence: 1,
    };

    component.data.domainItem = testDomainItem;

    component.ngOnInit();

    component.formValueToDomainParameter();

    expect(spy).toHaveBeenCalledWith({
      code: 'testCode',
      externalCode: 'testExternalCode',
      externalLabel: 'testExternalLabel',
      extView: false,
      id: 2,
      isModified: true,
      isoCode: 'testIsoCode',
      itemStatus: 'ACTIVE',
      keyCode: 'testKeyCode',
      label: 'testLabel',
      name: 'testLabel',
      new: false,
      sequence: 1,
      version: 1,
      isRemoved: false,
    });
  });
});
