import { Injectable } from '@angular/core';
import { QuickSearchEntity } from '@models/models';
import { ApiService } from '@services/api/api.service';
import { sortResultsByTypeOrder } from '@shared/utils/helpers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private apiService: ApiService) {}

  search(query: string): Observable<QuickSearchEntity[]> {
    return this.apiService
      .read<QuickSearchEntity[]>(
        `/quick-search/search?criteria=${encodeURIComponent(query)}`
      )
      .pipe(
        map((results) => {
          return sortResultsByTypeOrder(results);
        })
      );
  }
}
