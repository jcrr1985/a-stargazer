import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {
  LOADING_CONFIGURATION,
  LoadingConfiguration,
} from '../configuration/loading.configuration';
import { LoadingService } from '../service/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private count = 0;

  constructor(
    private loadingService: LoadingService,
    @Inject(LOADING_CONFIGURATION) private configuration: LoadingConfiguration
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Uses configuration.excludeUrls to prevent loading component
    if (
      this.configuration.excludeUrls.length > 0 &&
      new RegExp(`(${this.configuration.excludeUrls.join('|')})$`).test(
        request.url.split('?')[0]
      )
    ) {
      return next.handle(request);
    }

    // Uses custom request.headers to prevent loading component
    if (request.headers.get(this.configuration.skipLoadingHeaderName)) {
      return next.handle(
        request.clone({
          headers: request.headers.delete(
            this.configuration.skipLoadingHeaderName
          ),
        })
      );
    }

    // Negative loadingService.useInterceptor to prevent loading component
    if (!this.loadingService.useInterceptor) {
      return next.handle(request);
    }

    if (this.count === 0) {
      this.loadingService.show();
    }

    this.count++;

    return next.handle(request).pipe(
      finalize(() => {
        this.count--;

        if (this.count === 0) {
          this.loadingService.hide();
        }
      })
    );
  }
}
