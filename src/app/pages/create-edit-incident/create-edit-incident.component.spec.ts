import {
  ComponentFixture,
  TestBed,
  discardPeriodicTasks,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EntityType } from '@constants/entities';
import { IncidentDTO } from '@models/incident-dto.model';
import { SaveIncidentRequestDTO } from '@models/save-incident-request-dto.model';
import { IncidentsService } from '@services/incidents/incidents.service';
import { TabsService } from '@services/tabs/tabs.service';
import { SharedModule } from '@shared/shared.module';
import { clickElement } from '@testing/dom-testing-utils';
import { fakeRouter } from '@testing/fake-router';
import { LoadingModule } from 'loading';
import { MatTimepickerModule } from 'mat-timepicker';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { of, throwError } from 'rxjs';
import { TableGeneratorComponent } from 'table-generator';
import { IncidentAttachmentsComponent } from './components/incident-attachments/incident-attachments.component';
import { IncidentSummaryComponent } from './components/incident-summary/incident-summary.component';
import { IncidentUpdateHistoryComponent } from './components/incident-update-history/incident-update-history.component';
import { CreateEditIncidentComponent } from './create-edit-incident.component';

describe('CreateEditIncidentComponent', () => {
  let component: CreateEditIncidentComponent;
  let tabsService: TabsService;
  let incidentsService: IncidentsService;
  let snackbarService: MatSnackBar;
  let dialogService: MatDialog;
  let fixture: ComponentFixture<CreateEditIncidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CreateEditIncidentComponent,
        IncidentAttachmentsComponent,
        IncidentSummaryComponent,
        IncidentUpdateHistoryComponent,
        TableGeneratorComponent,
      ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        LoggerTestingModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatOptionModule,
        MatSelectModule,
        MatIconModule,
        MatPaginatorModule,
        MatTableModule,
        MatTimepickerModule,
        MatTooltipModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterTestingModule,
        LoadingModule.forRoot({ excludeUrls: [''] }),
        TranslateTestingModule.withTranslations({ en: {} }),
      ],
      providers: [
        { provide: Router, useValue: fakeRouter },
        MatDialog,
        TabsService,
        MatSnackBar,
        IncidentsService,
        MatDatepickerModule,
        MatNativeDateModule,
      ],
    }).compileComponents();
    tabsService = TestBed.inject(TabsService);
    tabsService.addTab(
      'Create Incident',
      CreateEditIncidentComponent,
      EntityType.INCIDENT,
      {}
    );
  });

  beforeEach(() => {
    incidentsService = TestBed.inject(IncidentsService);
    dialogService = TestBed.inject(MatDialog);
    snackbarService = TestBed.inject(MatSnackBar);
    fixture = TestBed.createComponent(CreateEditIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create correctly on add mode', () => {
    expect(component).toBeTruthy();
    expect(component.isEditMode).toBeFalsy();
  });

  it('should create correctly on edit mode', () => {
    tabsService.patchActiveTabContext({
      isEditMode: true,
      incidentForm: { incidentNo: '12-123-45' },
    });

    component.ngAfterViewInit();

    expect(component).toBeTruthy();
    expect(component.isEditMode).toBeTruthy();
  });

  it('should set new form value into tab context when form changes', fakeAsync(() => {
    const mockDate = new Date(2023, 0, 1, 0, 0);
    const patchTabContextSpy = spyOn(tabsService, 'patchActiveTabContext');

    component.incidentForm.controls.timingStartDate.setValue(mockDate);
    fixture.detectChanges();
    tick(1000);

    expect(patchTabContextSpy).toHaveBeenCalled();
    discardPeriodicTasks();
  }));

  it('should set date on merge time if date was not set before', () => {
    const mockDate = new Date(2023, 0, 1, 12, 0);

    component.mergeTimingDateTime(mockDate, 'timingStartDate');
    fixture.detectChanges();

    expect(component.incidentForm.value.timingStartDate).toEqual(mockDate);
  });

  it('should get subCategories when category is selected', (done) => {
    const mockCategory = { id: 1 };
    const mockSubcategory = {
      id: 12,
      version: 0,
      sequence: '14',
      value: 'B_OTHER',
      abbreviation: 'Bui Other',
      description: 'Other',
      incidentCategory: null,
    };
    const getSubcategoriesSpy = spyOn(
      incidentsService,
      'getSubcategoriesByCategoryId'
    ).and.returnValue(of([mockSubcategory]));

    component.incidentForm.controls.category.setValue(mockCategory);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.availableSubcategories).toEqual([mockSubcategory]);
      expect(getSubcategoriesSpy).toHaveBeenCalledWith(mockCategory.id);
      done();
    });
  });

  it('should save correctly', fakeAsync(() => {
    const timingStartDate = new Date(2023, 9, 3, 1, 0, 0);
    const timingEndDate = new Date(2023, 9, 5, 2, 0, 0);
    const mockFormValue = {
      status: 'OPEN',
      id: null,
      version: 0,
      entityTrackerIdBean: null,
      timingStartDate,
      timingEndDate,
      duringTransmission: false,
      isReviewed: true,
      isServiceRestablished: true,
      category: {
        id: 9,
        version: 0,
        sequence: '30',
        value: 'EQUIPMENT',
        abbreviation: 'Equipment',
        description: 'Equipment',
      },
      subcategory: {
        id: 18,
        version: 0,
        sequence: '22',
        value: 'INTERCOM_SYS',
        abbreviation: 'Evc Evc',
        description: 'Intercom system',
        incidentCategory: {
          version: 0,
          id: 9,
          sequence: 30,
          value: 'EQUIPMENT',
          abbreviation: 'Equipment',
          description: 'Equipment',
          active: true,
          businessKey: '9',
          new: false,
        },
      },
      owner: {
        id: 64,
        code: 'WF_TOC',
        label: 'TOC WSHT',
      },
      duringProgram: false,
      essaResponsible: 'NO',
      refeed: 'NO',
      region: 'AMERICA',
      displayOnReport: false,
      serviceAffecting: 'NO',
      subject: '[UNIT] TEST_DATA',
      summary: {
        description: 'TEST:longdescriptiontobeshrinked',
        informationToCaller: 'TEST_infocaller',
        action: 'TEST_action',
        resolution: 'TEST_resolution',
        transmissions: [
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
        ],
        resources: [
          {
            id: 28814,
            version: 6,
            type: 'INPUT_OUTPUT',
            code: 'GNVE ZZEBU/GNVA1_FO04GNVA(29205)',
            codeLocal: 'GNVA1_FO04GNVA(29205)',
            name: 'FO04GNVA',
            resourceProfile: {
              id: 101,
              version: 0,
              code: 'D2F_PORT_OUT',
              name: 'BC D2F Port Destination',
              type: 'INPUT_OUTPUT',
              canHaveProduct: false,
            },
            event: null,
          },
        ],
        organizations: [
          {
            id: 10778,
            version: 28,
            code: 'SN2STV',
            name: '2STV - Origines SA',
            type: 'NMEMB',
            isActive: true,
            isPoRefMandatory: false,
            financialStatusType: 'PP',
            invoice: false,
          },
        ],
      },
      notes: {
        all: [],
        changed: [],
        removed: [],
      },
      attachments: [],
      xrmManagedIncident: false,
      identifier: '',
    };

    const expectedSaveDTO: SaveIncidentRequestDTO = {
      id: null,
      version: 0,
      entityTrackerIdBean: null,
      no: null,
      description: 'TEST:longdescriptiontobeshrinked',
      startDate: [2023, 10, 3, 1, 0, 0],
      endDate: [2023, 10, 5, 2, 0, 0],
      category: {
        id: 9,
        version: 0,
        sequence: '30',
        value: 'EQUIPMENT',
        abbreviation: 'Equipment',
        description: 'Equipment',
      },
      subCategory: {
        id: 18,
        version: 0,
        sequence: '22',
        value: 'INTERCOM_SYS',
        abbreviation: 'Evc Evc',
        description: 'Intercom system',
        incidentCategory: {
          version: 0,
          id: 9,
          sequence: 30,
          value: 'EQUIPMENT',
          abbreviation: 'Equipment',
          description: 'Equipment',
          active: true,
          businessKey: '9',
          new: false,
        },
      },
      status: 'OPEN',
      reviewed: true,
      region: 'AMERICA',
      responsible: 'NO',
      reFeed: 'NO',
      serviceAffecting: 'NO',
      transmissions: [
        {
          id: null,
          version: 0,
          entityTrackerIdBean: null,
          transmission: {
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
        },
      ],
      resources: [
        {
          id: 28814,
          version: 6,
          type: 'INPUT_OUTPUT',
          code: 'GNVE ZZEBU/GNVA1_FO04GNVA(29205)',
          codeLocal: 'GNVA1_FO04GNVA(29205)',
          name: 'FO04GNVA',
          resourceProfile: {
            id: 101,
            version: 0,
            code: 'D2F_PORT_OUT',
            name: 'BC D2F Port Destination',
            type: 'INPUT_OUTPUT',
            canHaveProduct: false,
          },
          event: null,
        },
      ],
      organizations: [
        {
          id: 10778,
          version: 28,
          code: 'SN2STV',
          name: '2STV - Origines SA',
          type: 'NMEMB',
          isActive: true,
          isPoRefMandatory: false,
          financialStatusType: 'PP',
          invoice: false,
        },
      ],
      action: 'TEST_action',
      owner: {
        id: 64,
        code: 'WF_TOC',
        label: 'TOC WSHT',
      },
      informationToCaller: 'TEST_infocaller',
      resolution: 'TEST_resolution',
      notes: [],
      noteChanges: {
        notesChanged: [],
        notesRemoved: [],
      },
      attachments: [],
      subject: '[UNIT] TEST_DATA',
      serviceReestablished: true,
      duringTransmission: false,
      duringProgram: false,
      displayOnReport: false,
      identifier: '',
      defaultEntityType: 'INCIDENT',
      entityNameEnum: 'INCIDENT',
      entityType: 'INCIDENT',
      xrmManagedIncident: false,
      name: 'TEST:longdescriptiontobes(...)',
      code: null,
    };
    spyOn(dialogService, 'open').and.returnValue({
      afterClosed: () => of(true),
    } as any);
    const saveSpy = spyOn(incidentsService, 'saveIncident').and.returnValue(
      of({} as IncidentDTO)
    );
    component.incidentForm.controls.timingEndDate.enable();
    component.incidentForm.controls.subcategory.enable();

    component.incidentForm.patchValue(mockFormValue);
    fixture.detectChanges();
    clickElement(fixture, '#button-save');
    fixture.detectChanges();
    tick(1000);

    expect(saveSpy).toHaveBeenCalledWith(expectedSaveDTO);
    discardPeriodicTasks();
  }));

  it('should open snackbar when failed to save', fakeAsync(() => {
    const timingStartDate = new Date(2023, 9, 3, 1, 0, 0);
    const timingEndDate = new Date(2023, 9, 5, 2, 0, 0);
    const mockFormValue = {
      status: 'OPEN',
      id: null,
      version: 0,
      entityTrackerIdBean: null,
      timingStartDate,
      timingEndDate,
      duringTransmission: false,
      isReviewed: true,
      isServiceRestablished: true,
      category: {
        id: 9,
        version: 0,
        sequence: '30',
        value: 'EQUIPMENT',
        abbreviation: 'Equipment',
        description: 'Equipment',
      },
      subcategory: {
        id: 18,
        version: 0,
        sequence: '22',
        value: 'INTERCOM_SYS',
        abbreviation: 'Evc Evc',
        description: 'Intercom system',
        incidentCategory: {
          version: 0,
          id: 9,
          sequence: 30,
          value: 'EQUIPMENT',
          abbreviation: 'Equipment',
          description: 'Equipment',
          active: true,
          businessKey: '9',
          new: false,
        },
      },
      owner: {
        id: 64,
        code: 'WF_TOC',
        label: 'TOC WSHT',
      },
      duringProgram: false,
      essaResponsible: 'NO',
      refeed: 'NO',
      region: 'AMERICA',
      displayOnReport: false,
      serviceAffecting: 'NO',
      subject: '[UNIT] TEST_DATA',
      summary: {
        description: 'TEST:longdescriptiontobeshrinked',
        informationToCaller: 'TEST_infocaller',
        action: 'TEST_action',
        resolution: 'TEST_resolution',
        transmissions: [
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
        ],
        resources: [
          {
            id: 28814,
            version: 6,
            type: 'INPUT_OUTPUT',
            code: 'GNVE ZZEBU/GNVA1_FO04GNVA(29205)',
            codeLocal: 'GNVA1_FO04GNVA(29205)',
            name: 'FO04GNVA',
            resourceProfile: {
              id: 101,
              version: 0,
              code: 'D2F_PORT_OUT',
              name: 'BC D2F Port Destination',
              type: 'INPUT_OUTPUT',
              canHaveProduct: false,
            },
            event: null,
          },
        ],
        organizations: [
          {
            id: 10778,
            version: 28,
            code: 'SN2STV',
            name: '2STV - Origines SA',
            type: 'NMEMB',
            isActive: true,
            isPoRefMandatory: false,
            financialStatusType: 'PP',
            invoice: false,
          },
        ],
      },
      notes: {
        all: [],
        changed: [],
        removed: [],
      },
      attachments: [],
      xrmManagedIncident: false,
      identifier: '',
    };
    spyOn(dialogService, 'open').and.returnValue({
      afterClosed: () => of(true),
    } as any);
    spyOn(incidentsService, 'saveIncident').and.returnValue(throwError(''));
    const snackbarSpy = spyOn(snackbarService, 'open');
    component.incidentForm.controls.timingEndDate.enable();
    component.incidentForm.controls.subcategory.enable();
    component.incidentForm.patchValue(mockFormValue);

    fixture.detectChanges();
    clickElement(fixture, '#button-save');
    fixture.detectChanges();
    tick(1000);

    expect(snackbarSpy).toHaveBeenCalledWith('Failed to save', 'Close', {
      panelClass: ['neos-snackbar-error'],
    });
    discardPeriodicTasks();
  }));

  it('should close tab correctly', () => {
    const removeTabSpy = spyOn(tabsService, 'removeTab').and.returnValue(
      of(undefined).toPromise()
    );

    clickElement(fixture, '#button-close-tab');

    expect(removeTabSpy).toHaveBeenCalled();
  });
});
