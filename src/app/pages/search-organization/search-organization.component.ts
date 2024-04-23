import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  CityCombobox,
  Country,
  DisplayedColumns,
  FinancialStatusOption,
  OrganizationSearchResultDTO,
  SearchOrganizationDataSource,
  SearchOrganizationFormValue,
  TypeOption,
  YesNoOption,
} from '@models/models';
import { OrganizationsService } from '@services/organizations/organizations.service';
import { TabsService } from '@services/tabs/tabs.service';
import { filterObjectArrayByProperty } from '@shared/utils/helpers';
import { Subject } from 'rxjs';
import { debounceTime, map, takeUntil, tap } from 'rxjs/operators';
import { ColumnsConfiguration } from 'table-generator';

@Component({
  selector: 'app-search-organization',
  templateUrl: './search-organization.component.html',
  styleUrls: ['./search-organization.component.scss'],
})
export class SearchOrganizationComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  form!: FormGroup;

  displayedColumns = [
    DisplayedColumns.Code,
    DisplayedColumns.Name,
    DisplayedColumns.Type,
    DisplayedColumns.Country,
    DisplayedColumns.City,
    DisplayedColumns.financialStatusType,
    DisplayedColumns.Customer,
    DisplayedColumns.Provider,
    DisplayedColumns.Active,
    DisplayedColumns.DefaultPhone,
    DisplayedColumns.DefaultMail,
    DisplayedColumns.DefaultSystem,
    DisplayedColumns.ColumnsSelector,
  ];

  configuration: ColumnsConfiguration = {
    code: {
      translateKey: DisplayedColumns.Code,
      type: 'string',
    },
    name: {
      translateKey: DisplayedColumns.Name,
      type: 'number',
      width: '250px',
    },

    type: {
      translateKey: DisplayedColumns.Type,
      type: 'string',
    },
    country: {
      translateKey: DisplayedColumns.Country,
      type: 'string',
    },
    city: {
      translateKey: DisplayedColumns.City,
      type: 'string',
    },
    financialStatusType: {
      translateKey: DisplayedColumns.financialStatusType,
      type: 'string',
    },
    customer: {
      translateKey: DisplayedColumns.Customer,
      type: 'string',
    },
    provider: {
      translateKey: DisplayedColumns.Provider,
      type: 'string',
    },
    active: {
      translateKey: DisplayedColumns.Active,
      type: 'string',
    },
    defaultPhone: {
      translateKey: DisplayedColumns.DefaultPhone,
      type: 'string',
    },
    defaultMail: {
      translateKey: DisplayedColumns.DefaultMail,
      type: 'string',
    },
    defaultSystem: {
      translateKey: DisplayedColumns.DefaultSystem,
      type: 'string',
    },
  };

  typeOptions: TypeOption[] = [
    TypeOption.MEMB,
    TypeOption.NMEMB,
    TypeOption.NA,
    TypeOption.APPP,
    TypeOption.ASSM,
  ];

  financialStatusOptions: FinancialStatusOption[] = [
    FinancialStatusOption.BL,
    FinancialStatusOption.PP,
    FinancialStatusOption.OK,
  ];
  yesNoOption = YesNoOption;
  data!: SearchOrganizationDataSource[];
  filteredCountries!: Country[];
  filteredCities!: CityCombobox[];
  cities: CityCombobox[] = [];
  countries: Country[] = [];

  private _onDestroy$ = new Subject<void>();
  private _initialFormValue = {
    code: '',
    name: '',
    type: [],
    country: [],
    defaultCity: [],
    financialStatusType: [],
    isCustomer: [],
    isProvider: [],
    isActive: [],
    isBilledCurrencyLocked: [],
    isPoRefMandatory: [],
  };

  constructor(
    private formBuilder: FormBuilder,
    private tabsService: TabsService,
    public route: ActivatedRoute,
    private organizationsService: OrganizationsService
  ) {
    this.form = this.formBuilder.group(this._initialFormValue);
  }

  ngOnInit(): void {
    const masterData = this.route.snapshot.data.masterDataResolver;
    this.cities = masterData.cities;
    this.countries = masterData.countries;

    this.form
      .get('defaultCity')!
      .valueChanges.pipe(
        map((inputData) =>
          filterObjectArrayByProperty<CityCombobox>(
            inputData,
            this.cities,
            'name'
          )
        ),
        takeUntil(this._onDestroy$)
      )
      .subscribe((value) => {
        this.filteredCities = value;
      });

    this.form
      .get('country')!
      .valueChanges.pipe(
        map((inputData) =>
          filterObjectArrayByProperty<Country>(
            inputData,
            this.countries,
            'name'
          )
        ),
        takeUntil(this._onDestroy$)
      )
      .subscribe((value) => {
        this.filteredCountries = value;
      });
  }

  ngAfterViewInit(): void {
    const tabContext = this.tabsService.getActiveTabData().contextData;
    if (tabContext) {
      if (tabContext.searchOrganizationForm) {
        this.form.patchValue(tabContext.searchOrganizationForm);
      }

      if (tabContext.results) {
        this.data = tabContext.results;
      }
    }

    this.form.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.tabsService.patchActiveTabContext({
            searchOrganizationForm: this.form.value,
          });
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }

  displaySelectName(object: Country | CityCombobox): string {
    return object && object.name ? object.name : '';
  }

  search() {
    const formValue: SearchOrganizationFormValue = this.form.value;

    this.organizationsService
      .searchOrganization(formValue)
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((organizations: OrganizationSearchResultDTO[]) => {
        const tableData = organizations.map(
          (org: OrganizationSearchResultDTO) => ({
            id: org.id,
            version: org.version,
            code: org.code,
            name: org.name,
            financialStatusType: org.financialStatusType,
            type: org.type,
            customer: org.customer,
            provider: org.provider,
            active: org.active,
            defaultPhone: org.defaultPhone,
            poRefMandatory: org.poRefMandatory,
            billedCurrencyLocked: org.billedCurrencyLocked,
            country:
              typeof org.country === 'string' ? org.country : org.country?.name,
            city:
              typeof org.defaultCity === 'string'
                ? org.defaultCity
                : org.defaultCity?.name,
            defaultSystem: org.defaultSystem?.label
              ? org.defaultSystem?.label
              : '',
            defaultMail: org.defaultMail,
          })
        );

        this.data = tableData;

        this.tabsService.patchActiveTabContext({
          results: tableData,
        });
      });
  }

  clear(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.form.reset(this._initialFormValue);
  }

  closeTab() {
    this.tabsService.removeTab(this.tabsService.activeTabId);
  }
  ngOnDestroy(): void {
    this._onDestroy$.next();
  }
}
