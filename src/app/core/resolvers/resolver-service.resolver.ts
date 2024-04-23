import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { SearchCriteria } from '@models/models';
import { ApiService } from '@services/api/api.service';
import { constructUrlWithParams } from '@shared/utils/helpers';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The resolve item
 */
export interface ResolveItem {
  /**
   * The key to identify data in response object
   */
  resolveKey: string;

  /**
   * The request url
   */
  url: string;

  /**
   * The request method
   */
  method: string;

  /**
   * The request body
   */
  body?: SearchCriteria;

  /**
   * The request params
   */
  params?: string;
}

/**
 * Data from ActivatedRouteSnapshot
 */
export interface ResolveData {
  resolveItems: ResolveItem[];
  [key: string]: any;
}

/**
 * @example
 * // my-routing.module.ts
 * const routes: Routes = [
 *  {
 *    path: 'rute',
 *    component: MyComponent,
 *    resolve: { resolveProperty: ResolverService },
 *    data: {
 *      resolveItems: [
 *        {
 *          resolveKey: 'countries',
 *          url: '/countries/search',
 *          method: 'post',
 *          body: { orders: [{ identifier: 'name', asc: true }] },
 *        },
 *        {
 *          resolveKey: 'cities',
 *          url: '/cities/search',
 *          method: 'post',
 *          body: { orders: [{ identifier: 'name', asc: true }] },
 *        },
 *      ],
 *    } as ResolveData,
 *  },
 * ];
 *
 * // my-component.component.ts
 * // observable way
 * constructor(private activatedRoute: ActivatedRoute) {
 *   activatedRoute.data.subscribe((resolveProperty) => {
 *    // do something with the data
 *   }
 * }
 *
 * // snapshot way
 * constructor(route: ActivatedRouteSnapshot) {
 *  route.data
 * }
 */
@Injectable({
  providedIn: 'root',
})
export class ResolverService<T extends {}> implements Resolve<T> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const data = route.data as ResolveData;

    const requests = data.resolveItems.map((item) => {
      const constructedUrl = constructUrlWithParams(item.url, item.body);

      if (item.method === 'get') {
        return this.apiService.read<T>(constructedUrl);
      } else {
        return this.apiService.create<T>(constructedUrl, {
          body: item.body,
        });
      }
    });

    return forkJoin(requests).pipe(
      map((responseList) => {
        const resolverObject: Record<any, any> = {};
        responseList.forEach((responseData, index) => {
          const resolveKey = data.resolveItems[index].resolveKey;
          resolverObject[resolveKey] = responseData;
        });
        return resolverObject;
      })
    );
  }
}
