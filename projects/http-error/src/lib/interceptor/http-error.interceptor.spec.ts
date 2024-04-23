import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { HttpErrorService } from '../service/http-error.service';
import { HttpErrorInterceptor } from './http-error.interceptor';

describe('HttpErrorInterceptor', () => {
  let interceptor: HttpErrorInterceptor;
  let service: HttpErrorService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi: true,
        },
      ],
    });

    service = TestBed.inject(HttpErrorService);
    interceptor = TestBed.inject(HttpErrorInterceptor);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should call HttpErrorService with a add method', fakeAsync(() => {
    const errorResponse = new HttpErrorResponse({
      status: 404,
      statusText: 'Not Found',
    });

    const spy = spyOn(service, 'add');

    httpClient.get('/path').subscribe({
      next: () => {
        // This block should not be executed
        fail('Expected an error but got a successful response');
      },
      error: (error) => {
        expect(error.message).toBe(
          'Http failure response for /path: 404 Not Found'
        );
      },
    });

    httpTestingController
      .expectOne('/path')
      .error(new ErrorEvent('ErrorEvent'), errorResponse);

    expect(spy).toHaveBeenCalled();

    httpTestingController.verify();
    flush();
  }));

  it('should call HttpErrorService with a add method and "catch" error', fakeAsync(() => {
    const spy = spyOn(service, 'add');

    httpClient.get('/path').subscribe({
      next: () => {
        // This block should not be executed
        fail('Expected an error but got a successful response');
      },
      error: (error) => {
        // Last ' ' is important
        expect(error.message).toBe('Http failure response for /path: 0 ');
      },
    });

    httpTestingController
      .expectOne('/path')
      .error(new ErrorEvent('Catch Error'));

    expect(spy).toHaveBeenCalled();

    httpTestingController.verify();
    flush();
  }));
});
