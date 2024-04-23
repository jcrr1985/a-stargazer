import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getReasonPhrase } from 'http-status-codes';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorService } from '../service/http-error.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private httpErrorService: HttpErrorService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(this.httpErrorService.getHttpRetry()),
      catchError((error) => {
        this.httpErrorService.add(this.getServerErrorMessage(error));

        return throwError(error);
      })
    );
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    try {
      return `${error.status} - ${getReasonPhrase(error.status)}: ${
        error.message
      }`;
    } catch (err) {
      return `${error.message}`;
    }
  }
}
