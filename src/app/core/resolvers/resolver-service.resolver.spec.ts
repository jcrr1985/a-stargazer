import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ResolveData } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '@services/api/api.service';
import {
  cities,
  eventSearchResultData,
} from '@services/quick-search/mock-data-for-form';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { of } from 'rxjs';
import { ResolverService } from './resolver-service.resolver';

class ApiServiceStub {
  read = jasmine.createSpy('read').and.returnValue(of(eventSearchResultData));
  create = jasmine.createSpy('create').and.returnValue(of(cities));
}
describe('ResolverService', () => {
  let resolver: ResolverService<any>;
  let mockResolveData: ResolveData;

  beforeEach(() => {
    mockResolveData = {
      resolveItems: [
        {
          resolveKey: 'eventSearchResultData',
          url: '/mock-url-1',
          method: 'get',
        },
        {
          resolveKey: 'cities',
          url: '/mock-url-2',
          method: 'post',
          body: { key: 'value' },
        },
      ],
    };
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        LoggerModule.forRoot({
          level: NgxLoggerLevel.DEBUG,
          serverLogLevel: NgxLoggerLevel.ERROR,
        }),
      ],
      providers: [{ provide: ApiService, useClass: ApiServiceStub }],
    });
    resolver = TestBed.inject(ResolverService);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should map get requests', () => {
    const route = { data: mockResolveData } as any;
    resolver.resolve(route).subscribe((results) => {
      expect(results).toEqual({ cities, eventSearchResultData });
    });
  });

  it('should map post requests', () => {
    const route = { data: mockResolveData } as any;
    resolver.resolve(route).subscribe((results) => {
      expect(results).toEqual({ cities, eventSearchResultData });
    });
  });
});
