import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { QuickSearchEntity, QuickSearchEntityType } from '@models/models';
import { SearchService } from '@services/quick-search/quick-search.service';
import { dispatchInputValue } from '@testing/dom-testing-utils';
import { LoggerConfig } from 'ngx-logger';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { of } from 'rxjs';
import { QuickSearchComponent } from './quick-search.component';

describe('QuickSearchComponent', () => {
  let component: QuickSearchComponent;
  let fixture: ComponentFixture<QuickSearchComponent>;
  let searchService: SearchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuickSearchComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatInputModule,
        FormsModule,
        MatAutocompleteModule,
        MatIconModule,
        MatOptionModule,
        NoopAnimationsModule,
        TranslateTestingModule.withTranslations({
          en: {
            quickSearch: 'Quick Search',
          },
        }),
      ],
      providers: [SearchService, LoggerConfig, DatePipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickSearchComponent);
    component = fixture.componentInstance;
    searchService = TestBed.inject(SearchService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe from destroy$ on ngOnDestroy', () => {
    const unsubscribeNext = spyOn(component.destroy$, 'next');
    const unsubscribeComplete = spyOn(component.destroy$, 'complete');
    component.ngOnDestroy();
    expect(unsubscribeNext).toHaveBeenCalled();
    expect(unsubscribeComplete).toHaveBeenCalled();
  });

  it('should call searchService.search with correct parameter and update quickSearchResults when query length is >= 3', waitForAsync(() => {
    const query = 'testQuery';
    const mockResults = [
      { id: 1, name: 'Result 1', code: 'a', type: QuickSearchEntityType.EVT },
    ];
    spyOn(searchService, 'search').and.returnValue(of(mockResults));

    dispatchInputValue(fixture, '#quick-search', query);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.quickSearchResults).toEqual(mockResults);
      expect(searchService.search).toHaveBeenCalledWith(query);
    });
  }));

  it('should clear quickSearchResults when query < 3', fakeAsync(() => {
    const query = 'ab';
    spyOn(component['searchService'], 'search');
    fixture.detectChanges();
    component.subjectInput.next(query);
    tick(600);
    expect(component.quickSearchResults).toEqual([]);
  }));

  it('should select an option and hide results', () => {
    const option = 'Selected Option';
    component.selectOption(option);
    expect(component.selectedOption).toEqual(option);
    expect(component.showResults).toBeFalse();
  });

  it('should format the result with type, code, and name', () => {
    const result: QuickSearchEntity = {
      id: 1,
      type: QuickSearchEntityType.EVT,
      code: '23581',
      name: 'Test event',
    };
    const formattedResult = component.formatResult(result);
    expect(formattedResult).toEqual('EVT 23581 - Test event');
  });

  it('should format the result with only type and code when name is null', () => {
    const result: QuickSearchEntity = {
      id: 1,
      type: QuickSearchEntityType.EVT,
      code: '23581',
      name: null,
    };
    const formattedResult = component.formatResult(result);
    expect(formattedResult).toEqual('EVT 23581');
  });

  it('should format the result with only type and code when name is empty', () => {
    const result: QuickSearchEntity = {
      id: 1,
      type: QuickSearchEntityType.EVT,
      code: '23581',
      name: '',
    };

    const formattedResult = component.formatResult(result);
    expect(formattedResult).toEqual('EVT 23581');
  });

  it('should clear searchValue and quickSearchResults', () => {
    component.searchControl.setValue('Initial Search Value');
    component.quickSearchResults = [{}, {}];

    component.onQuickSearchClear();

    expect(component.searchControl.value).toBe('');
    expect(component.quickSearchResults.length).toBe(0);
  });
});
