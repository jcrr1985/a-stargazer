import { Injectable } from '@angular/core';
import { TransmissionLightDTO } from '@models/transmission-light-dto.model';
import { ApiService } from '@services/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransmissionsService {
  private _endpointURL = '/transmissions';

  constructor(private readonly apiService: ApiService) {}

  getFilteredTransmissions(
    searchCriteria: string,
    limit = 1000
  ): Observable<TransmissionLightDTO[]> {
    return this.apiService.create<TransmissionLightDTO[]>(
      `${this._endpointURL}/search-criteria-light`,
      {
        body: {
          first: 0,
          max: limit,
          orders: [{ identifier: 'no', asc: true }],
          terms: [
            {
              identifier: null,
              value: null,
              type: 'Or',
              terms: [
                {
                  identifier: 'no',
                  value: searchCriteria,
                  type: 'Like',
                  likeType: 'CONTAINS',
                  operator: true,
                },
                {
                  identifier: 'title',
                  value: searchCriteria,
                  type: 'Like',
                  likeType: 'CONTAINS',
                  operator: true,
                },
              ],
            },
          ],
          relations: [],
          values: {},
        },
      }
    );
  }
}
