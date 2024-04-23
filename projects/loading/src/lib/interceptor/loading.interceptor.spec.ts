import { Overlay } from '@angular/cdk/overlay';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  DEFAULT_LOADING_CONFIGURATION,
  LOADING_CONFIGURATION,
} from '../configuration/loading.configuration';
import { LoadingComponent } from '../loading.component';
import { LoadingService } from '../service/loading.service';
import { LoadingInterceptor } from './loading.interceptor';

describe('LoadingInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let loadingService: LoadingService;
  let httpClient: HttpClient;

  const excludeUrl = '/excluded';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        Overlay,
        LoadingService,
        LoadingInterceptor,
        {
          provide: LOADING_CONFIGURATION,
          useValue: {
            ...DEFAULT_LOADING_CONFIGURATION,
            loadingComponent: LoadingComponent,
            excludeUrls: [excludeUrl],
            skipLoadingHeaderName: 'X-Skip-Loading',
          },
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoadingInterceptor,
          multi: true,
        },
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    loadingService = TestBed.inject(LoadingService);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    // Ensure no outstanding requests
    httpTestingController.verify();
  });

  it('should be created', () => {
    const interceptor = TestBed.inject(LoadingInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should intercept HTTP request and show/hide loading', () => {
    const showSpy = spyOn(loadingService, 'show');
    const hideSpy = spyOn(loadingService, 'hide');

    // Make a sample HTTP request that will trigger the interceptor
    httpClient.get('/data').subscribe();

    // Verify that the request was intercepted
    const req = httpTestingController.expectOne('/data');

    // Simulate the response from the server
    req.flush({ data: 'test' });

    expect(showSpy).toHaveBeenCalledTimes(1);
    expect(hideSpy).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    // Ensure no outstanding requests
    httpTestingController.verify();
  });

  it('should intercept HTTP multiple requests and show/hide loading', () => {
    const showSpy = spyOn(loadingService, 'show');
    const hideSpy = spyOn(loadingService, 'hide');

    // Make multiple api request
    httpClient.get('/data').subscribe();
    httpClient.get('/data2').subscribe();

    // Verify that the request was intercepted
    const req = httpTestingController.expectOne('/data');
    const req2 = httpTestingController.expectOne('/data2');

    // Simulate the response from the server
    req.flush({ data: 'test' });
    req2.flush({ data: 'test' });

    expect(showSpy).toHaveBeenCalledTimes(1);
    expect(hideSpy).toHaveBeenCalledTimes(1);
  });

  it('should skip loading service for excluded URLs', () => {
    const showSpy = spyOn(loadingService, 'show');

    // Simulate a request to an excluded URL
    httpClient.get(excludeUrl).subscribe();

    const req = httpTestingController.expectOne(excludeUrl);
    req.flush({ data: 'test' });

    // The loadingService should not be shown for the excluded URL
    expect(showSpy).not.toHaveBeenCalled();
  });

  it('should skip loading service for requests with skip loading header', () => {
    const showSpy = spyOn(loadingService, 'show');
    const headers = { 'X-Skip-Loading': 'true' };

    // Simulate a request with skip loading header
    httpClient.get('/data', { headers }).subscribe();

    const req = httpTestingController.expectOne('/data');
    req.flush({ data: 'test' });

    // The loadingService should not be shown for the request with skip loading header
    expect(showSpy).not.toHaveBeenCalled();
  });

  it('should not use the interceptor when useInterceptor is false', () => {
    const showSpy = spyOn(loadingService, 'show');
    loadingService.useInterceptor = false;

    // Simulate an HTTP request
    httpClient.get('/data').subscribe();

    const req = httpTestingController.expectOne('/data');
    req.flush({ data: 'test' });

    // The loadingService should not be shown when useInterceptor is false
    expect(showSpy).not.toHaveBeenCalled();
  });
});
