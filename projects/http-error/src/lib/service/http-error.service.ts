import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorService {
  message$ = new Subject<string>();
  modalClosed$ = new Subject<string>();

  retry = 0;

  constructor() {}

  getHttpRetry() {
    return this.retry;
  }

  setHttpRetry(retry: number) {
    this.retry = retry;
  }

  add(message: string) {
    this.message$.next(message);
  }

  modalAfterClosed(message: string) {
    this.modalClosed$.next(message);
  }
}
