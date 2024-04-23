import { TestBed } from '@angular/core/testing';
import { HttpErrorService } from './http-error.service';

describe('HttpErrorService', () => {
  let service: HttpErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('set http retry', () => {
    service.setHttpRetry(1);

    expect(service.getHttpRetry()).toBe(1);
  });

  it('add message', () => {
    service.message$.subscribe((message) => {
      expect(message).toBe('Test');
    });

    service.add('Test');
  });

  it('modalAfterClosed', () => {
    service.modalClosed$.subscribe((message) => {
      expect(message).toBe('Test');
    });

    service.modalAfterClosed('Test');
  });
});
