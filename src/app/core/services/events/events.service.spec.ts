import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EventSearchCriteria, EventSearchResultData } from '@models/models';
import { ApiService } from '@services/api/api.service';
import {
  eventSearchResultData,
  mockEventSearchCriteria,
} from '@services/quick-search/mock-data-for-form';
import { LoggerConfig, NGXLogger, NGXLoggerHttpService } from 'ngx-logger';
import { of } from 'rxjs';
import { EventsService } from './events.service';

describe('EventsService', () => {
  let service: EventsService;
  let apiService: ApiService;

  let mockSearchResults: EventSearchResultData[] = eventSearchResultData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ApiService,
          useValue: {
            create: (url: string, httpOptions?: any) => of(mockSearchResults),
          },
        },
        LoggerConfig,
        { provide: LoggerConfig, useValue: LoggerConfig },
        NGXLogger,
        NGXLoggerHttpService,
        LoggerConfig,
      ],
    });
    service = TestBed.inject(EventsService);
    apiService = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call ApiService.create with the correct arguments', () => {
    const eventSearchCriteria: EventSearchCriteria = mockEventSearchCriteria;
    const expectedUrl = '/events/search';
    const expectedBody = eventSearchCriteria;
    spyOn(service.apiService, 'create').and.callThrough();

    service.searchEvents(eventSearchCriteria).subscribe((res) => {
      expect(res).toEqual(mockSearchResults);
    });

    expect(service.apiService.create).toHaveBeenCalledWith(expectedUrl, {
      body: expectedBody,
    });
  });
});
