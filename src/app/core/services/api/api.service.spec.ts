import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@environment';
import {
  ApiService,
  DEFAULT_HTTP_OPTIONS,
  HttpOptions,
} from '@services/api/api.service';
import { NGXLogger } from 'ngx-logger';
import { LoggerTestingModule } from 'ngx-logger/testing';

interface MockRequestBody {
  ok: boolean;
}

const mockHttpOptions: HttpOptions<MockRequestBody> = {
  body: { ok: true },
};

interface MockResponseData {
  status: string;
  data: { ok: boolean }[];
}

const mockData: MockResponseData = {
  status: 'success',
  data: [
    {
      ok: true,
    },
  ],
};

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;
  let mockLogger: Partial<NGXLogger>;

  beforeEach(() => {
    mockLogger = {
      error: jasmine.createSpy('error'),
      info: jasmine.createSpy('info'),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, LoggerTestingModule],
      providers: [ApiService, { provide: NGXLogger, useValue: mockLogger }],
    });

    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service['baseUrl']).toBe(environment.baseUrl);
    expect(service['httpOptions']).toEqual(DEFAULT_HTTP_OPTIONS);
  });

  it('should return the baseUrl property', () => {
    const baseUrl = service.getBaseUrl();

    expect(baseUrl).toBe(environment.baseUrl);
  });

  it('setHttpOptions default value', () => {
    service.setHttpOptions();

    expect(service['httpOptions']).toEqual(DEFAULT_HTTP_OPTIONS);
  });

  it('setHttpOptions default value', () => {
    const httpOptions: HttpOptions<undefined> = {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      observe: 'events',
      responseType: 'blob',
    };

    service.setHttpOptions(httpOptions);

    expect(service['httpOptions']).toEqual(httpOptions);
  });

  it('getHttpOptions', () => {
    service.setHttpOptions();

    expect(service.getHttpOptions()).toEqual(DEFAULT_HTTP_OPTIONS);
  });

  it('serBaseUrl', () => {
    service.setBaseUrl('https://baseUrl.com');

    expect(service['baseUrl']).toBe(`https://baseUrl.com`);
  });

  it('getCompleteUrl url startWith("/")', () => {
    service.setBaseUrl('https://baseUrl.com');

    expect(service.getCompleteUrl('/path')).toBe('https://baseUrl.com/path');
  });

  it('getCompleteUrl url no startWith("/")', () => {
    service.setBaseUrl('https://baseUrl.com');

    expect(() => {
      service.getCompleteUrl('path');
    }).toThrowError('URL should start with "/"');
  });

  it('create OK', () => {
    service.setBaseUrl('https://baseUrl.com');
    service.create<any>('/path', mockHttpOptions).subscribe({
      next: (response) => {
        expect(response).toEqual(mockData);
      },
    });

    const req = httpTestingController.expectOne({
      method: 'POST',
      url: `https://baseUrl.com/path`,
    });

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(mockHttpOptions.body);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush(mockData);
    httpTestingController.verify();
  });

  it('create KO', () => {
    service.setBaseUrl('https://baseUrl.com');
    service.create<any>('/path', mockHttpOptions).subscribe({
      next: () => {
        // This block should not be executed
        fail('Expected an error but got a successful response');
      },
      error: (error) => {
        expect(error).toBeDefined();
      },
    });

    const req = httpTestingController.expectOne({
      method: 'POST',
      url: `https://baseUrl.com/path`,
    });

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(mockHttpOptions.body);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush('Deliberate error 404', { status: 404, statusText: 'Not Found' });
    httpTestingController.verify();
  });

  it('read OK', () => {
    service.setBaseUrl('https://baseUrl.com');
    service.read<any>('/path').subscribe({
      next: (response) => {
        expect(response).toEqual(mockData);
      },
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `https://baseUrl.com/path`,
    });

    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush(mockData);
    httpTestingController.verify();
  });

  it('read KO', () => {
    service.setBaseUrl('https://baseUrl.com');
    service.read<any>('/path').subscribe({
      next: () => {
        // This block should not be executed
        fail('Expected an error but got a successful response');
      },
      error: (error) => {
        expect(error).toBeDefined();
      },
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `https://baseUrl.com/path`,
    });

    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush('Deliberate error 404', { status: 404, statusText: 'Not Found' });
    httpTestingController.verify();
  });

  it('update OK', () => {
    service.setBaseUrl('https://baseUrl.com');
    service.update<any>('/path', mockHttpOptions).subscribe({
      next: (response) => {
        expect(response).toEqual(mockData);
      },
    });

    const req = httpTestingController.expectOne({
      method: 'PUT',
      url: `https://baseUrl.com/path`,
    });

    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBe(mockHttpOptions.body);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush(mockData);
    httpTestingController.verify();
  });

  it('update KO', () => {
    service.setBaseUrl('https://baseUrl.com');
    service.update<any>('/path', mockHttpOptions).subscribe({
      next: () => {
        // This block should not be executed
        fail('Expected an error but got a successful response');
      },
      error: (error) => {
        expect(error).toBeDefined();
      },
    });

    const req = httpTestingController.expectOne({
      method: 'PUT',
      url: `https://baseUrl.com/path`,
    });
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBe(mockHttpOptions.body);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush('Deliberate error 404', { status: 404, statusText: 'Not Found' });
    httpTestingController.verify();
  });

  it('delete OK', () => {
    service.setBaseUrl('https://baseUrl.com');
    service.delete<any>('/path').subscribe({
      next: (response) => {
        expect(response).toEqual(mockData);
      },
    });

    const req = httpTestingController.expectOne({
      method: 'DELETE',
      url: `https://baseUrl.com/path`,
    });

    expect(req.request.method).toBe('DELETE');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush(mockData);
    httpTestingController.verify();
  });

  it('delete KO', () => {
    service.setBaseUrl('https://baseUrl.com');
    service.delete<any>('/path').subscribe({
      next: () => {
        // This block should not be executed
        fail('Expected an error but got a successful response');
      },
      error: (error) => {
        expect(error).toBeDefined();
      },
    });

    const req = httpTestingController.expectOne({
      method: 'DELETE',
      url: `https://baseUrl.com/path`,
    });

    expect(req.request.method).toBe('DELETE');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush('Deliberate error 404', { status: 404, statusText: 'Not Found' });
    httpTestingController.verify();
  });
});
