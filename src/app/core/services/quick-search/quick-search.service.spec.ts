import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from '@services/api/api.service';
import {
  LoggerConfig,
  LoggerModule,
  NGXLogger,
  NGXLoggerHttpService,
  NgxLoggerLevel,
} from 'ngx-logger';
import { SearchService } from './quick-search.service';

describe('SearchService', () => {
  let service: SearchService;
  let httpMock: HttpTestingController;

  const mockData = [
    {
      id: 869,
      code: '23038',
      name: 'Death FC',
      type: 'EVT',
    },
  ];
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CommonModule,
        HttpClientModule,
        LoggerModule.forRoot({
          level: NgxLoggerLevel.DEBUG,
          serverLogLevel: NgxLoggerLevel.ERROR,
        }),
      ],
      providers: [
        SearchService,
        ApiService,
        DatePipe,
        NGXLogger,
        { provide: LoggerConfig, useValue: LoggerConfig },
        NGXLoggerHttpService,
        LoggerConfig,
        DatePipe,
      ],
    });
    service = TestBed.inject(SearchService);
    httpMock = TestBed.inject(HttpTestingController);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return specific objects when searching for "Death FC"', () => {
    const query = 'Death FC';

    service.search(query).subscribe((results) => {
      expect(results).toBeDefined();
      expect(results.length).toBeGreaterThan(0);

      const deathFCResult = results.find(
        (result) => result.name === 'Death FC'
      );
      expect(deathFCResult).toBeDefined();
    });
    const req = httpTestingController.expectOne(
      `quick-search/search?criteria=${encodeURIComponent(query)}`
    );
    req.flush(mockData);
  });

  it('should return an empty array when searching for non-existent item', () => {
    const query = 'Non-existent Item';

    service.search(query).subscribe((results) => {
      expect(results).toBeDefined();
      expect(results.length).toBe(0);
    });
    const req = httpTestingController.expectOne(
      `quick-search/search?criteria=${encodeURIComponent(query)}`
    );
    req.flush([]);
  });
});
