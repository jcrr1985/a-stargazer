import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserGroup } from '@constants/app-user-groups';
import { DomainEntity } from '@constants/domain-entities';
import { DomainItem } from '@models/domain-item.model';
import {
  CityCombobox,
  EventSearchCriteria,
  MediaCombobox,
  StatusCombobox,
  YesNoOption,
} from '@models/models';
import { DomainsService } from '@services/domains/domains.service';
import { TabsService } from '@services/tabs/tabs.service';
import {
  dateToLocalDate,
  filterObjectArrayByProperty,
} from '@shared/utils/helpers';
import { dateGreaterThan } from '@shared/validators/date-greater-than-validator';
import { Subject } from 'rxjs';
import { debounceTime, map, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() onSearch: EventEmitter<EventSearchCriteria> = new EventEmitter();
  @Output() onClear: EventEmitter<void> = new EventEmitter();

  form: FormGroup;
  cities: CityCombobox[] = [];
  eventTypes: DomainItem[] = [];
  bureaus: DomainItem[] = [];
  filteredCities!: CityCombobox[];
  statuses = StatusCombobox;
  medias = MediaCombobox;
  optionsYesNo = YesNoOption;

  private _onDestroy$ = new Subject<void>();
  private _initialFormValue = {
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
  };

  constructor(
    private formBuilder: FormBuilder,
    readonly tabsService: TabsService,
    private route: ActivatedRoute,
    private domainsService: DomainsService
  ) {
    this.form = this.formBuilder.group({
      no: new FormControl(),
      periodBegin: new FormControl(),
      periodEnd: new FormControl(null, [dateGreaterThan('periodBegin')]),
      city: new FormControl(),
      eventTypeList: new FormControl(),
      statusList: new FormControl(),
      bureauList: new FormControl(),
      mediaList: new FormControl(),
      isParent: new FormControl(),
      IsPMO: new FormControl(),
      parent: new FormControl(),
      quoteId: new FormControl(),
      userGroups: new FormControl(),
    });
    this.form.setValue(this._initialFormValue);
  }

  ngOnInit(): void {
    this.cities = this.route.snapshot.data.masterDataResolver.cities;

    this.domainsService
      .searchDomainEntityItems(DomainEntity.EVENT_TYPE)
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((eventTypes: DomainItem[]) => {
        this.eventTypes = eventTypes;
      });

    this.domainsService
      .searchDomainEntityItems(DomainEntity.BUREAU)
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((bureaus: DomainItem[]) => {
        this.bureaus = bureaus;
      });

    this.form
      .get('city')!
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
      .subscribe((filteredCities) => {
        this.filteredCities = filteredCities;
      });
  }

  ngAfterViewInit(): void {
    const tabContext = this.tabsService.getActiveTabData().contextData;
    if (tabContext) {
      if (tabContext.searchEventForm) {
        this.form.patchValue(tabContext.searchEventForm);
      }
    }

    this.form.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.tabsService.patchActiveTabContext({
            searchEventForm: this.form.value,
          });
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }

  search() {
    if (this.form.invalid) {
      return;
    }

    const eventSearchDto = this.form.value;
    eventSearchDto.periodBegin = eventSearchDto.periodBegin
      ? dateToLocalDate(eventSearchDto.periodBegin).splice(0, 3)
      : null;
    eventSearchDto.periodEnd = eventSearchDto.periodEnd
      ? dateToLocalDate(eventSearchDto.periodEnd).splice(0, 3)
      : null;
    if (eventSearchDto.isParent === null) {
      eventSearchDto.isParent = false;
    }

    if (eventSearchDto.parent === null) {
      eventSearchDto.parent = false;
    }
    eventSearchDto.userGroups = [
      UserGroup.CUSTOMER_SERVICE_DESK,
      UserGroup.FINANCE,
    ];

    this.onSearch.emit(eventSearchDto);
  }

  clear(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.form.reset(this._initialFormValue);
    this.onClear.emit();
  }

  closeTab(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.tabsService.removeTab(this.tabsService.activeTabId);
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
  }
}
