import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OrganizationEmbeddedDTO } from '@models/organization-embedded-dto.model';
import { ResourceLightDTO } from '@models/resource-light-dto.model';
import { TransmissionLightDTO } from '@models/transmission-light-dto.model';
import { SharedModule } from '@shared/shared.module';
import { clickElement, selectElement } from '@testing/dom-testing-utils';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { of } from 'rxjs';
import { IncidentSummaryComponent } from './incident-summary.component';

describe('IncidentSummaryComponent', () => {
  let component: IncidentSummaryComponent;
  let fixture: ComponentFixture<IncidentSummaryComponent>;
  let dialogService: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncidentSummaryComponent],
      imports: [
        MatDialogModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        TranslateTestingModule.withTranslations({ en: {} }),
      ],
      providers: [
        {
          provide: FormGroupDirective,
          useValue: {
            control: {
              get: (name: string) =>
                new FormGroup({
                  transmissions: new FormControl([]),
                  resources: new FormControl([]),
                  organizations: new FormControl([]),
                  description: new FormControl(),
                  informationToCaller: new FormControl(),
                  action: new FormControl(),
                  resolution: new FormControl(),
                }),
            },
          },
        },
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
    dialogService = TestBed.inject(MatDialog);
    fixture = TestBed.createComponent(IncidentSummaryComponent);
    component = fixture.componentInstance;
    component.formGroupName = 'test';
    fixture.detectChanges();
  });

  it('should create with all sections', () => {
    const transmissionsTable = selectElement(fixture, '#table-transmissions');
    const resourcesTable = selectElement(fixture, '#table-resources');
    const organizationsTable = selectElement(fixture, '#table-organizations');
    const descriptionInput = selectElement(fixture, '#input-description');
    const callerInput = selectElement(fixture, '#input-caller');
    const actionInput = selectElement(fixture, '#input-action');

    expect(component).toBeTruthy();
    expect(transmissionsTable).toBeDefined();
    expect(resourcesTable).toBeDefined();
    expect(organizationsTable).toBeDefined();
    expect(descriptionInput).toBeDefined();
    expect(callerInput).toBeDefined();
    expect(actionInput).toBeDefined();
  });

  it('should add transmissions to form', fakeAsync(() => {
    const fakeTransmission: TransmissionLightDTO = {
      id: 1,
      description: 'TX',
      startDate: [2020, 1, 1, 1, 0],
      endDate: [2020, 1, 1, 0, 0],
      event: null,
      no: '1',
      status: 'OPEN',
      title: 'UCL',
      version: 0,
    };
    spyOn(dialogService, 'open').and.returnValue({
      afterClosed: () => of(fakeTransmission),
    } as any);

    clickElement(fixture, '#table-transmissions #add-button');
    tick(1000);
    fixture.detectChanges();

    expect(component.form.value.transmissions).toEqual([fakeTransmission]);
    expect(component.selectedTransmissionsIds).toEqual([1]);
  }));

  it('should remove transmissions to form', fakeAsync(() => {
    const fakeTransmission: TransmissionLightDTO = {
      id: 1,
      description: 'TX',
      startDate: [2020, 1, 1, 1, 0],
      endDate: [2020, 1, 1, 0, 0],
      event: null,
      no: '1',
      status: 'OPEN',
      title: 'UCL',
      version: 0,
    };
    spyOn(dialogService, 'open').and.returnValue({
      afterClosed: () => of(fakeTransmission),
    } as any);

    clickElement(fixture, '#table-transmissions #add-button');
    tick(1000);
    fixture.detectChanges();
    clickElement(fixture, '#table-transmissions #remove-button');
    tick(1000);
    fixture.detectChanges();

    expect(component.form.value.transmissions).toEqual([]);
  }));

  it('should add resources to form', fakeAsync(() => {
    const fakeResource: ResourceLightDTO = {
      id: 1,
      code: '',
      version: 0,
      name: 'resource',
      codeLocal: 'Localresource',
      blackListed: false,
      type: 'type',
    };
    spyOn(dialogService, 'open').and.returnValue({
      afterClosed: () => of([fakeResource]),
    } as any);

    clickElement(fixture, '#table-resources #add-button');
    tick(1000);
    fixture.detectChanges();

    expect(component.form.value.resources).toEqual([fakeResource]);
  }));

  it('should remove resources to form', fakeAsync(() => {
    const fakeResource: ResourceLightDTO = {
      id: 1,
      code: '',
      version: 0,
      name: 'resource',
      codeLocal: 'Localresource',
      blackListed: false,
      type: 'type',
    };
    spyOn(dialogService, 'open').and.returnValue({
      afterClosed: () => of([fakeResource]),
    } as any);

    clickElement(fixture, '#table-resources #add-button');
    tick(1000);
    fixture.detectChanges();
    clickElement(fixture, '#table-resources #remove-button');
    tick(1000);
    fixture.detectChanges();

    expect(component.form.value.resources).toEqual([]);
  }));

  it('should add organization to form', fakeAsync(() => {
    const fakeOrganization: OrganizationEmbeddedDTO = {
      id: 1,
      code: '',
      version: 0,
      name: 'resource',
      type: 'type',
      isActive: true,
      financialStatusType: 'active',
      invoice: true,
      isPoRefMandatory: false,
    };
    spyOn(dialogService, 'open').and.returnValue({
      afterClosed: () => of([fakeOrganization]),
    } as any);

    clickElement(fixture, '#table-organizations #add-button');
    tick(1000);
    fixture.detectChanges();

    expect(component.form.value.organizations).toEqual([fakeOrganization]);
  }));

  it('should remove organization from form', fakeAsync(() => {
    const fakeOrganization: OrganizationEmbeddedDTO = {
      id: 1,
      code: '',
      version: 0,
      name: 'resource',
      type: 'type',
      isActive: true,
      financialStatusType: 'active',
      invoice: true,
      isPoRefMandatory: false,
    };
    spyOn(dialogService, 'open').and.returnValue({
      afterClosed: () => of([fakeOrganization]),
    } as any);

    clickElement(fixture, '#table-organizations #add-button');
    tick(1000);
    fixture.detectChanges();
    clickElement(fixture, '#table-organizations #remove-button');
    tick(1000);
    fixture.detectChanges();

    expect(component.form.value.organizations).toEqual([]);
  }));
});
