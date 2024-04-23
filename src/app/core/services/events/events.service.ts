import { Injectable } from '@angular/core';
import { EventSearchCriteria, EventSearchResultData } from '@models/models';
import { ApiService } from '@services/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(public apiService: ApiService) {}
  _endpointURL = '/events';

  searchEvents(
    eventSearchCriteria: EventSearchCriteria
  ): Observable<EventSearchResultData[]> {
    return this.apiService.create<EventSearchResultData[]>(
      `${this._endpointURL}/search`,
      {
        body: eventSearchCriteria,
      }
    );
  }
}
