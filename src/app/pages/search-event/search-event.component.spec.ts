import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EntityType } from '@constants/entities';
import { EventSearchResultData } from '@models/models';
import { Note } from '@models/note.model';
import { EventsService } from '@services/events/events.service';
import { NotesService } from '@services/notes/notes.service';
import {
  cities,
  countries,
  eventSearchResultData,
  mockEventSearchCriteria,
} from '@services/quick-search/mock-data-for-form';
import { TabDetail, TabsService } from '@services/tabs/tabs.service';
import { SharedModule } from '@shared/shared.module';
import { selectAllElements } from '@testing/dom-testing-utils';
import { fakeRouter } from '@testing/fake-router';
import { LoggerConfig, NGXLogger, NGXLoggerHttpService } from 'ngx-logger';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { of } from 'rxjs';
import { TableGeneratorModule } from 'table-generator';
import { FormComponent } from './form/form.component';
import { SearchEventComponent } from './search-event.component';

class ActivatedRouteStub {
  snapshot = { data: { masterDataResolver: { countries, cities } } };
}

describe('SearchEventComponent', () => {
  let component: SearchEventComponent;
  let fixture: ComponentFixture<SearchEventComponent>;
  let formComponent: FormComponent;
  let childDebugElement: DebugElement;
  const mockNotes: Note[] = [
    {
      id: 1,
      version: 1,
      title: 'Mock Note',
      description: 'This is a mock note.',
      category: 'Mock Category',
      status: 'Mock Status',
      visibilities: [
        {
          version: 1,
          id: 1,
          sequence: 1,
          keyCode: 'mock',
          code: 'MOCK',
          isoCode: null,
          externalCode: null,
          label: 'Mock',
          extView: false,
          externalLabel: null,
          itemStatus: 'ACTIVE',
          businessKey: 'mock',
          new: false,
        },
      ],
      highVisibility: false,
      attachments: [],
      relevantEntityLinks: [],
      creationDate: new Date(),
      creationUser: 'mock',
      lastUpdateDate: null,
      lastUpdateUser: null,
      entities: [
        {
          version: 1,
          id: 1,
          sequence: 1,
          keyCode: 'mock',
          code: 'MOCK',
          isoCode: null,
          externalCode: null,
          label: 'Mock',
          extView: false,
          externalLabel: null,
          itemStatus: 'ACTIVE',
          businessKey: 'mock',
          new: false,
        },
      ],
      archived: false,
      readOnly: false,
    },
    {
      id: 1,
      version: 1,
      title: 'Mock Note',
      description: 'This is a mock note.',
      category: 'Mock Category',
      status: 'Mock Status',
      visibilities: [
        {
          version: 1,
          id: 1,
          sequence: 1,
          keyCode: 'mock',
          code: 'MOCK',
          isoCode: null,
          externalCode: null,
          label: 'Mock',
          extView: false,
          externalLabel: null,
          itemStatus: 'ACTIVE',
          businessKey: 'mock',
          new: false,
        },
      ],
      highVisibility: false,
      attachments: [],
      relevantEntityLinks: [],
      creationDate: new Date(),
      creationUser: 'mock',
      lastUpdateDate: null,
      lastUpdateUser: null,
      entities: [
        {
          version: 1,
          id: 1,
          sequence: 1,
          keyCode: 'mock',
          code: 'MOCK',
          isoCode: null,
          externalCode: null,
          label: 'Mock',
          extView: false,
          externalLabel: null,
          itemStatus: 'ACTIVE',
          businessKey: 'mock',
          new: false,
        },
      ],
      archived: false,
      readOnly: false,
    },
  ];
  const mockEventSearchResultData: EventSearchResultData[] = [
    {
      no: 1,
      id: 1,
      isParent: false,
      periodBegin: [2021, 10, 10],
      periodEnd: [2021, 12, 31],
      description: 'Mock event',
      eventType: 'Mock type',
      city: 'Mock city',
      contract: 'Mock contract',
      salesDeal: 'Mock sales deal',
      status: 'Mock status',
      deadline: [2021, 10, 10],
      category: 'Mock category',
      subCategory: 'Mock sub-category',
      office: 'Mock office',
      quoteId: 'Mock quote ID',
      notes: true,
      isPMO: false,
      parent: true,
    },
  ];
  let tabsService: TabsService;
  let notesService: NotesService;
  let eventsService: EventsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchEventComponent, FormComponent],
      imports: [
        NoopAnimationsModule,
        CommonModule,
        FormsModule,
        MatTooltipModule,
        HttpClientTestingModule,
        SharedModule,
        RouterTestingModule,
        TableGeneratorModule,
        TranslateTestingModule.withTranslations({}),
      ],
      providers: [
        { provide: Router, useValue: fakeRouter },
        TabsService,
        EventsService,
        NotesService,
        DatePipe,
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        FormBuilder,
        LoggerConfig,
        NGXLogger,
        NGXLoggerHttpService,
      ],
    }).compileComponents();

    tabsService = TestBed.inject(TabsService);
    tabsService.addTab(
      'Create Incident',
      SearchEventComponent,
      EntityType.EVENT,
      {}
    );
  });

  beforeEach(() => {
    notesService = TestBed.inject(NotesService);
    eventsService = TestBed.inject(EventsService);
    fixture = TestBed.createComponent(SearchEventComponent);
    component = fixture.componentInstance;
    childDebugElement = fixture.debugElement.query(By.directive(FormComponent));
    formComponent = childDebugElement.componentInstance as FormComponent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger fetchDataSource when onSearch is emitted', () => {
    spyOn(component, 'fetchDataSource');
    formComponent.onSearch.emit(mockEventSearchCriteria);
    expect(component.fetchDataSource).toHaveBeenCalled();
  });

  it('should clear the form when clearForm is called', () => {
    formComponent.onClear.emit();
    expect(component.data).toEqual([]);
  });

  it('should call searchEvents when fetchDataSource is called', waitForAsync(() => {
    const searchSpy = spyOn(eventsService, 'searchEvents').and.returnValue(
      of(mockEventSearchResultData)
    );

    component.fetchDataSource({ no: 'data' });

    expect(component.data).toEqual(mockEventSearchResultData);
    expect(searchSpy).toHaveBeenCalled();
  }));

  it('should reload result from tab data correctly', () => {
    spyOn(tabsService, 'getActiveTabData').and.returnValue({
      contextData: { results: eventSearchResultData },
    } as TabDetail);

    component.ngAfterViewInit();

    expect(component.data).toEqual(eventSearchResultData);
  });

  it('should reload result from tab data correctly with empty results', () => {
    spyOn(tabsService, 'getActiveTabData').and.returnValue({
      contextData: { results: [] },
    } as TabDetail);

    component.ngAfterViewInit();

    expect(component.data).toEqual([]);
  });

  it('should call getNoteDescriptionsbyId and format the result', (done) => {
    const getNotesSpy = spyOn(
      notesService,
      'getNotesByEntityId'
    ).and.returnValue(of(mockNotes));
    const id = 1;

    component.getNoteDescriptionsbyId(id).subscribe((formattedNotes) => {
      expect(formattedNotes).toBe(
        'This is a mock note.\n --------- \nThis is a mock note.\n --------- \nThere is at least one attachment in the notes'
      );
      done();
    });
    expect(getNotesSpy).toHaveBeenCalledWith(id, EntityType.EVENT);
  });

  it('should set searchMethod correctly', () => {
    const getNotesSpy = spyOn(
      notesService,
      'getNotesByEntityId'
    ).and.returnValue(of(mockNotes));
    component.data = mockEventSearchResultData;

    fixture.detectChanges();

    const tooltipButton = selectAllElements(fixture, '#tooltip-button')[0];
    tooltipButton.nativeElement.click();

    expect(getNotesSpy).toHaveBeenCalled();
  });
});
