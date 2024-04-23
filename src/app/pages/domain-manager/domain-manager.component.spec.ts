import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DomainListsResponseDTO } from '@models/domain-lists-response-dto.model';
import { DomainMapping } from '@models/domain-mapping.model';
import { DomainParameter } from '@models/domain-parameter.model';
import { DomainsService } from '@services/domains/domains.service';
import { TabsService } from '@services/tabs/tabs.service';
import { SharedModule } from '@shared/shared.module';
import { clickElement, selectElement } from '@testing/dom-testing-utils';
import { fakeRouter } from '@testing/fake-router';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { of, throwError } from 'rxjs';
import { DomainMappingsComponent } from './components/domain-mappings/domain-mappings.component';
import { DomainParameterDialogComponent } from './components/domain-parameter-dialog/domain-parameter-dialog.component';
import { DomainParameterItemDialogComponent } from './components/domain-parameter-item-dialog/domain-parameter-item-dialog.component';
import { DomainParametersComponent } from './components/domain-parameters/domain-parameters.component';
import { DomainManagerComponent } from './domain-manager.component';

describe('DomainManagerComponent', () => {
  let component: DomainManagerComponent;
  let domainsService: DomainsService;
  let tabsService: TabsService;
  let snackbarService: MatSnackBar;
  let fixture: ComponentFixture<DomainManagerComponent>;
  let domainLists: DomainListsResponseDTO;
  let domainMappings: DomainMapping[] = [];
  let domainParameters: DomainParameter[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DomainManagerComponent,
        DomainMappingsComponent,
        DomainParameterDialogComponent,
        DomainParameterItemDialogComponent,
        DomainParametersComponent,
      ],
      imports: [
        SharedModule,
        MatIconModule,
        MatSnackBarModule,
        MatTooltipModule,
        NoopAnimationsModule,
        RouterTestingModule,
        TranslateTestingModule.withTranslations({ en: {} }),
      ],
      providers: [
        TabsService,
        { provide: Router, useValue: fakeRouter },
        {
          provide: DomainsService,
          useValue: {
            listAll: () => of(domainLists),
            saveAll: (saveDTO: DomainListsResponseDTO) => of(domainLists),
          },
        },
      ],
    }).compileComponents();
    tabsService = TestBed.inject(TabsService);
    tabsService.addUniqueTab('Manager', DomainManagerComponent);
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
    domainsService = TestBed.inject(DomainsService);
    snackbarService = TestBed.inject(MatSnackBar);
    fixture = TestBed.createComponent(DomainManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create with data from tab service', () => {
    tabsService.patchActiveTabContext({
      domains: { domainMappings, domainParameters },
    });

    component.ngOnInit();

    expect(component).toBeTruthy();
  });

  it('should have a header with 3 buttons and a title with the count of domains', () => {
    const titleText = selectElement(fixture, '.header .title').innerText;
    const saveButton = selectElement<HTMLButtonElement>(
      fixture,
      '.header #button-save'
    );
    const reloadButton = selectElement<HTMLButtonElement>(
      fixture,
      '.header #button-reload-tab'
    );
    const closeButton = selectElement<HTMLButtonElement>(
      fixture,
      '.header #button-close-tab'
    );

    expect(titleText).toEqual('Domains (1)');
    expect(saveButton).toBeDefined();
    expect(reloadButton).toBeDefined();
    expect(closeButton).toBeDefined();
  });

  it('should save data on save click', waitForAsync(() => {
    spyOn(domainsService, 'saveAll').and.callThrough();

    clickElement(fixture, '.header #button-save');

    expect(domainsService.saveAll).toHaveBeenCalledWith(domainLists);
  }));

  it('should show message on error', waitForAsync(() => {
    spyOn(domainsService, 'saveAll').and.returnValue(throwError('Fake error'));
    const snackbarOpenSpy = spyOn(snackbarService, 'open');

    clickElement(fixture, '.header #button-save');

    expect(snackbarOpenSpy).toHaveBeenCalledWith('Unexpected error', 'Close');
  }));

  it('should fetch data on reload click', () => {
    spyOn(domainsService, 'listAll').and.callThrough();

    clickElement(fixture, '.header #button-reload-tab');

    expect(domainsService.listAll).toHaveBeenCalled();
  });

  it('should close tab correctly', () => {
    const removeTabSpy = spyOn(tabsService, 'removeTab');

    clickElement(fixture, '#button-close-tab');

    expect(removeTabSpy).toHaveBeenCalled();
  });

  it('should handle data changes correctly', () => {
    const tabEditingSpy = spyOn(tabsService, 'setTabEditing');

    component.handleDataChanged([]);

    expect(tabEditingSpy).toHaveBeenCalledWith('Manager', true);
    expect(component.domainParameters).toEqual([]);
  });
});
