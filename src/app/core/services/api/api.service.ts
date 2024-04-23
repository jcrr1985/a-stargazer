import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { NGXLogger } from 'ngx-logger';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface HttpOptions<T> {
  body?: T;
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  params?:
    | HttpParams
    | {
        [param: string]: string | string[];
      };
  observe?: 'body' | 'events' | 'response';
  reportProgress?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  withCredentials?: boolean;
}

/**
 * Defult HttpOptions when call a ApiService request CRUD methods
 */
export const DEFAULT_HTTP_OPTIONS: HttpOptions<undefined> = {
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  observe: 'response' as 'body',
  responseType: 'json',
};

/**
 * Default API Service
 *
 * Based on CRUD methods
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  protected baseUrl: string = '';
  protected httpOptions: HttpOptions<any> = {};

  constructor(
    private httpClient: HttpClient,
    private readonly logger: NGXLogger
  ) {
    this.setBaseUrl(environment.baseUrl);
    this.setHttpOptions(DEFAULT_HTTP_OPTIONS);

    logger.info('baseUrl', this.baseUrl, 'httpOptions', this.httpOptions);
  }

  /**
   * Set Current HttpOptions
   *
   * @use Use `null` | `undefined` to restore `DEFAULT_HTTP_OPTIONS`
   *
   * @example
   * setHttpOptions()
   *
   * // this.httpOptions is DEFAULT_HTTP_OPTIONS
   */
  setHttpOptions<T>(httpOptions?: HttpOptions<T>) {
    if (!httpOptions) {
      this.httpOptions = DEFAULT_HTTP_OPTIONS;
    } else {
      this.httpOptions = httpOptions;
    }
  }

  /**
   * Get Current HttpOptions
   */
  getHttpOptions() {
    return this.httpOptions;
  }

  /**
   * Set the baseUrl
   */
  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Get the baseUrl
   */
  getBaseUrl() {
    return this.baseUrl;
  }

  /**
   * Get the complete url
   *
   * @example startsWith '/'
   *
   * this.baseUrl = ''
   * const criteria = '23-';
   * getCompleteUrl(`/quick-search/search?criteria=${encodeURIComponent(JSON.stringify(criteria)}`)
   *
   * // '/quick-search/search?criteria=23-'
   *
   * @example No startsWith '/'
   *
   * getCompleteUrl(`quick-search/search?criteria=${encodeURIComponent(JSON.stringify(criteria)}`)
   *
   * // '/quick-search/search?criteria=23-'
   */
  getCompleteUrl(url: string) {
    if (!url.startsWith('/')) {
      throw new Error('URL should start with "/"');
    }

    return `${this.baseUrl}${url}`;
  }

  /**
   * Create ('POST') request method
   *
   * @example
   * create('/events/search', { body: { eventType: 'News (Planned)' }})
   */
  create<T, U = {}>(url: string, httpOptions?: HttpOptions<U>): Observable<T> {
    return this.httpClient
      .request('POST', this.getCompleteUrl(url), {
        ...this.getHttpOptions(),
        ...httpOptions,
      })
      .pipe(
        map((response: HttpResponse<T>) => this.getResponseData<T>(response)),
        catchError((error: HttpErrorResponse) => this.handleError(error))
      );
  }

  /**
   * Read ('GET') request method
   *
   * @example
   * read(`/quick-search/search?criteria=${encodeURIComponent(JSON.stringify(criteria)}`)
   */
  read<T>(url: string, httpOptions?: HttpOptions<undefined>): Observable<T> {
    return this.httpClient
      .request('GET', this.getCompleteUrl(url), {
        ...this.getHttpOptions(),
        ...httpOptions,
      })
      .pipe(
        map((response: HttpResponse<T>) => this.getResponseData<T>(response)),
        catchError((error: HttpErrorResponse) => this.handleError(error))
      );
  }

  /**
   * Update ('PUT') request method
   *
   * TODO: Need to be verify if _ project uses 'PUT' methods
   *
   * @example
   * update('/incidents/category/update/1', { body: { city: 'RIGA', eventType: 'Old (Planned)' }})
   */
  update<T, U = {}>(url: string, httpOptions?: HttpOptions<U>): Observable<T> {
    return this.httpClient
      .request('PUT', this.getCompleteUrl(url), {
        ...this.getHttpOptions(),
        ...httpOptions,
      })
      .pipe(
        map((response: HttpResponse<T>) => this.getResponseData<T>(response)),
        catchError((error: HttpErrorResponse) => this.handleError(error))
      );
  }

  /**
   * Delete ('DELETE') request method
   *
   * TODO: Need to be verify if _v2 project uses 'DELETE' methods
   *
   * @example
   * delete('/incidents/category/delete/1')
   */
  delete<T>(url: string, httpOptions?: HttpOptions<undefined>): Observable<T> {
    return this.httpClient
      .request('DELETE', this.getCompleteUrl(url), {
        ...this.getHttpOptions(),
        ...httpOptions,
      })
      .pipe(
        map((response: HttpResponse<T>) => this.getResponseData<T>(response)),
        catchError((error: HttpErrorResponse) => this.handleError(error))
      );
  }

  private getResponseData<T>(response: HttpResponse<T>): T {
    this.logger.info(response);

    return response.body!;
  }

  private handleError(error: HttpErrorResponse) {
    this.logger.info('Something wrong happened', error);

    return throwError(error);
  }
}
