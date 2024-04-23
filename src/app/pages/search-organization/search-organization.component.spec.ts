import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EntityType } from '@constants/entities';
import {
  OrganizationSearchResultDTO,
  SearchOrganizationDataSource,
  SearchOrganizationFormValue,
  YesNoOption,
} from '@models/models';
import { ApiService } from '@services/api/api.service';
import { OrganizationsService } from '@services/organizations/organizations.service';
import {
  cities,
  countries,
  organizationSearchResultDTO,
} from '@services/quick-search/mock-data-for-form';
import { TabDetail, TabsService } from '@services/tabs/tabs.service';
import { SharedModule } from '@shared/shared.module';
import { LoggerConfig } from 'ngx-logger';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { Observable, of } from 'rxjs';
import { SearchOrganizationComponent } from './search-organization.component';

class OrganizationsServiceStub {
  searchOrganization(
    _: SearchOrganizationFormValue
  ): Observable<OrganizationSearchResultDTO[]> {
    return of(organizationSearchResultDTO);
  }
}

class ActivatedRouteStub {
  snapshot = { data: { masterDataResolver: { countries, cities } } };
}

class ApiServiceStub {
  read = jasmine.createSpy('read').and.returnValue(of([]));
  create = jasmine.createSpy('create').and.returnValue(of([]));
}

describe('SearchOrganizationComponent', () => {
  let component: SearchOrganizationComponent;
  let fixture: ComponentFixture<SearchOrganizationComponent>;
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
      declarations: [SearchOrganizationComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        SharedModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatTooltipModule,
        RouterTestingModule,
        TranslateTestingModule.withTranslations({}),
      ],
      providers: [
        FormBuilder,
        {
          provide: OrganizationsService,
          useClass: OrganizationsServiceStub,
        },
        LoggerConfig,
        {
          provide: ApiService,
          useClass: ApiServiceStub,
        },
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteStub,
        },
        {
          provide: TabsService,
          useValue: tabsServiceSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    tabsService = TestBed.inject(TabsService);
    fixture = TestBed.createComponent(SearchOrganizationComponent);
    component = fixture.componentInstance;
    component.countries = countries;
    component.cities = cities;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create with data stored', () => {
    const formValue = {
      code: 'ORG001',
      name: 'Organization 1',
      type: ['Type 1', 'Type 2'],
      country: ['USA', 'Canada'],
      defaultCity: ['New York', 'Toronto'],
      financialStatusType: ['Active', 'Inactive'],
      isCustomer: [YesNoOption.Yes],
      isProvider: [YesNoOption.Yes],
      isActive: [YesNoOption.Yes],
      isBilledCurrencyLocked: [YesNoOption.Yes],
      isPoRefMandatory: [YesNoOption.Yes],
    };
    const fakeTableData: SearchOrganizationDataSource[] = [];

    tabsServiceSpy.getActiveTabData.and.returnValue({
      contextData: {
        searchOrganizationForm: formValue,
        results: fakeTableData,
      },
    } as TabDetail);

    component.ngAfterViewInit();

    expect(component.form.value).toEqual(formValue);
    expect(component.data).toEqual(fakeTableData);
  });

  it('should reset the form when clear() is called', () => {
    const formBuilder = TestBed.inject(FormBuilder);
    const form: FormGroup = formBuilder.group({
      name: '',
    });
    component.form = form;
    spyOn(form, 'reset');

    const event = new MouseEvent('click');
    component.clear(event);
    expect(form.reset).toHaveBeenCalled();
  });

  it('should remove the active tab when closeTab() is called', () => {
    const tabsService = TestBed.inject(TabsService);
    component.closeTab();
    expect(tabsService.removeTab).toHaveBeenCalled();
  });

  it('sohould fetch countries and cities on OnIit', () => {
    expect(component.countries.length).toBeGreaterThan(0);
    expect(component.cities.length).toBeGreaterThan(0);
    expect(component.countries).toEqual(countries);
    expect(component.cities).toEqual(cities);
  });

  it('should filter cities when city value changes', fakeAsync(() => {
    const form = component.form;
    const cityControl = form.get('defaultCity')!;

    cityControl.setValue('ESBJERG');
    tick(3000);
    fixture.detectChanges();
    expect(component.filteredCities).toEqual([cities[0]]);
  }));

  it('should set countries and cities by subscribing to route data', () => {
    expect(component.countries.length).toBeGreaterThan(0);
    expect(component.cities.length).toBeGreaterThan(0);
    expect(component.countries).toEqual(countries);
    expect(component.cities).toEqual(cities);
  });

  it('should transform organizations data using map()', fakeAsync(() => {
    const rawData: SearchOrganizationFormValue = {
      code: 'ORG001',
      name: 'Organization 1',
      type: ['Type 1', 'Type 2'],
      country: ['USA', 'Canada'],
      defaultCity: ['New York', 'Toronto'],
      financialStatusType: ['Active', 'Inactive'],
      isCustomer: [YesNoOption.Yes],
      isProvider: [YesNoOption.Yes],
      isActive: [YesNoOption.Yes],
      isBilledCurrencyLocked: [YesNoOption.Yes],
      isPoRefMandatory: [YesNoOption.Yes],
    };

    component.form.setValue(rawData);
    fixture.detectChanges();
    component.search();
    tick(3000);

    expect(component.data.length).toBeGreaterThan(0);
  }));
});
