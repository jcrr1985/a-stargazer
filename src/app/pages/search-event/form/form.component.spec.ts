import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { DatePipe } from '@angular/common';
import { HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EntityType } from '@constants/entities';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { DomainsService } from '@services/domains/domains.service';
import { cities, countries } from '@services/quick-search/mock-data-for-form';
import { TabDetail, TabsService } from '@services/tabs/tabs.service';
import { LoggerConfig, NGXLogger, NGXLoggerHttpService } from 'ngx-logger';
import { of } from 'rxjs';
import { FormComponent } from './form.component';
class DomainsServiceStub {
  searchDomainEntityItems() {
    return of([]);
  }
}

class ActivtedRouteStub {
  snapshot = { data: { masterDataResolver: { countries, cities } } };
}

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let tabsService: TabsService;
  let tabsServiceSpy: jasmine.SpyObj<TabsService>;

  beforeEach(async () => {
    tabsServiceSpy = jasmine.createSpyObj('TabsService', [
      'getActiveTabData',
      'removeTab',
      'patchActiveTabContext',
    ]);
    tabsServiceSpy.getActiveTabData.and.returnValue({
      id: '1',
      label: 'test',
      component: component,
      tabRoute: [EntityType.TOOLS],
      isEdited: false,
    });
    tabsServiceSpy.removeTab.and.returnValue(Promise.resolve());

    await TestBed.configureTestingModule({
      declarations: [FormComponent],

      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        MatIconModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatExpansionModule,
        MatAutocompleteModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
        RouterTestingModule,
      ],
      providers: [
        FormBuilder,
        DatePipe,
        { provide: LoggerConfig, useValue: LoggerConfig },
        NGXLogger,
        NGXLoggerHttpService,
        LoggerConfig,
        { provide: DomainsService, useClass: DomainsServiceStub },
        HttpHandler,
        TranslateService,
        { provide: ActivatedRoute, useClass: ActivtedRouteStub },
        {
          provide: TabsService,
          useValue: tabsServiceSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    tabsService = TestBed.inject(TabsService);
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create with form data stored', () => {
    const formValue = {
      no: 1,
      periodBegin: new Date(2023, 0, 1),
      periodEnd: new Date(2023, 1, 1),
      city: '',
      eventTypeList: ['a'],
      statusList: ['a'],
      bureauList: ['a'],
      mediaList: [],
      isParent: null,
      IsPMO: ['Y'],
      parent: null,
      quoteId: 'a',
      userGroups: ['a', 'b'],
    };
    tabsServiceSpy.getActiveTabData.and.returnValue({
      contextData: { searchEventForm: formValue },
    } as TabDetail);

    component.ngAfterViewInit();

    expect(component.form.value).toEqual(formValue);
  });

  it('should set countries and cities by subscribing to route data', () => {
    expect(component.cities.length).toBeGreaterThan(0);
    expect(component.cities).toEqual(cities);
  });

  it('should remove the active tab when closeTab() is called', () => {
    component.closeTab(new MouseEvent('click'));
    expect(tabsServiceSpy.removeTab).toHaveBeenCalled();
  });

  it('should emit form value on search', () => {
    component.form.setValue({
      no: 1,
      periodBegin: new Date(2023, 0, 1),
      periodEnd: new Date(2023, 1, 1),
      city: '',
      eventTypeList: ['a'],
      statusList: ['a'],
      bureauList: ['a'],
      mediaList: [],
      isParent: null,
      IsPMO: ['Y'],
      parent: null,
      quoteId: 'a',
      userGroups: ['a', 'b'],
    });
    spyOn(component.onSearch, 'emit');
    const event = new Event('click');
    component.search();
    expect(component.onSearch.emit).toHaveBeenCalled();
  });

  it('should reset form and emit on clear', () => {
    spyOn(component.onClear, 'emit');
    component.form.setValue({
      no: 1,
      periodBegin: [2022, 2, 2],
      periodEnd: [2023, 2, 2],
      city: '',
      eventTypeList: ['a'],
      statusList: ['a'],
      bureauList: ['a'],
      mediaList: [],
      isParent: true,
      IsPMO: ['Y'],
      parent: null,
      quoteId: 'a',
      userGroups: ['a', 'b'],
    });
    const event = new Event('click');

    component.clear(event);
    expect(component.form.value).toEqual({
      no: null,
      periodBegin: null,
      periodEnd: null,
      city: '',
      eventTypeList: [],
      statusList: [],
      bureauList: [],
      mediaList: [],
      isParent: null,
      IsPMO: null,
      parent: null,
      quoteId: '',
      userGroups: [],
    });
    expect(component.onClear.emit).toHaveBeenCalled();
  });

  it('should filter cities when city value changes', fakeAsync(() => {
    const form: FormGroup = component.form;
    const cityControl = form.get('city')!;
    cityControl.setValue('ESBJERG');

    tick(3000);

    fixture.detectChanges();

    expect(component.filteredCities).toEqual([cities[0]]);
  }));

  it('should prevent eventemitter to trigger search if form is invalid', () => {
    const event: MouseEvent = new MouseEvent('click');
    spyOn(component.onSearch, 'emit');

    component.form.setErrors({ invalid: true });

    component.search();

    expect(component.onSearch.emit).not.toHaveBeenCalled();
  });
});
