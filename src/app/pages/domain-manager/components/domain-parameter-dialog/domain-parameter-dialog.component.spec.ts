import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { DomainParameter } from '@models/domain-parameter.model';
import { SharedModule } from '@shared/shared.module';
import { DomainParameterDialogComponent } from './domain-parameter-dialog.component';

describe('DomainParameterDialogComponent', () => {
  let component: DomainParameterDialogComponent;
  let fixture: ComponentFixture<DomainParameterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DomainParameterDialogComponent],
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
    fixture = TestBed.createComponent(DomainParameterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();
    expect(component.form.get('groupCode')!.value).toBeNull();
    expect(component.form.get('code')!.value).toBeNull();
  });

  it('should populate form values from domainParameter data', () => {
    component.data.domainParameter = {
      version: 1,
      id: 2,
      keyCode: 'testKeyCode',
      code: 'testCode',
      label: 'testLabel',
      groupCode: 'testGroupCode',
      externalLabel: 'testExternalLabel',
      domainStatus: 'testDomainStatus',
      items: [],
      isModified: false,
      isRemoved: false,
      businessKey: 'testBusinessKey',
      new: false,
    };
    component.ngOnInit();
    expect(component.form.get('code')!.value).toEqual('testCode');
    expect(component.form.get('label')!.value).toEqual('testLabel');
    expect(component.form.get('groupCode')!.value).toEqual('testGroupCode');
    expect(component.form.get('externalLabel')!.value).toEqual(
      'testExternalLabel'
    );
    expect(component.form.get('domainStatus')!.value).toEqual(
      'testDomainStatus'
    );
  });

  it('should map inputDomainParameter values to DomainParameter', () => {
    const spy = spyOn(component.dialogRef, 'close');

    const testDomainParameter: DomainParameter = {
      version: 1,
      id: 2,
      keyCode: 'testKeyCode',
      code: 'testCode',
      label: 'testLabel',
      groupCode: 'testGroupCode',
      externalLabel: 'testExternalLabel',
      domainStatus: 'testDomainStatus',
      items: [],
      isModified: false,
      isRemoved: true,
      businessKey: 'testBusinessKey',
      new: true,
    };

    component.data.domainParameter = testDomainParameter;
    component.ngOnInit();

    component.form.patchValue({
      code: 'newCode',
      label: 'newLabel',
      groupCode: 'newGroupCode',
      externalLabel: 'newExternalLabel',
      domainStatus: 'newDomainStatus',
    });

    component.formValueToDomainParameter();

    expect(spy).toHaveBeenCalledWith({
      version: 1,
      id: 2,
      keyCode: 'testKeyCode',
      code: 'newCode',
      label: 'newLabel',
      groupCode: 'newGroupCode',
      externalLabel: 'newExternalLabel',
      domainStatus: 'newDomainStatus',
      items: [],
      isModified: true,
      isRemoved: false,
      businessKey: 'testBusinessKey',
      new: false,
    });
  });
});
