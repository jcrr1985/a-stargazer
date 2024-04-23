import { Injectable } from '@angular/core';
import { ResourceLightDTO } from '@models/resource-light-dto.model';
import { ResourceWithProfileAndEventLightDTO } from '@models/resource-with-profile-and-event-light-dto.model';
import { SunOutageAvailabilityDefinitionDTO } from '@models/sun-outage-availability-definition-dto.model';
import { ApiService } from '@services/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResourcesService {
  private _endpointURL = '/resources';

  constructor(private readonly apiService: ApiService) {}

  getResourcesByTransmissionIdList(
    transmissionIds: number[]
  ): Observable<ResourceWithProfileAndEventLightDTO[]> {
    return this.apiService.create<ResourceWithProfileAndEventLightDTO[]>(
      `${this._endpointURL}/findResourceList`,
      {
        body: transmissionIds,
      }
    );
  }

  getFilteredResources(
    searchCriteria: string,
    limit = 1000
  ): Observable<ResourceLightDTO[]> {
    return this.apiService.create<ResourceLightDTO[]>(
      `${this._endpointURL}/search`,
      {
        body: {
          first: 0,
          max: limit,
          orders: [{ identifier: 'code', asc: true }],
          terms: [
            {
              identifier: 'code',
              value: searchCriteria,
              type: 'Like',
              likeType: 'BEGIN',
              operator: true,
            },
          ],
          relations: [],
          values: {},
        },
      }
    );
  }

  getSatellites(limit = 1000): Observable<ResourceLightDTO[]> {
    return this.apiService.create<ResourceLightDTO[]>(
      `${this._endpointURL}/search`,
      {
        body: {
          first: 0,
          max: limit,
          orders: [
            {
              identifier: 'code',
              asc: true,
            },
          ],
          terms: [
            {
              identifier: null,
              value: null,
              type: 'And',
              terms: [
                {
                  identifier: 'status',
                  value: ['ACTIVE'],
                  type: 'In',
                },
              ],
            },
          ],
          relations: [
            {
              type: 'Join',
              relationEntity: 'resourceProfile',
              terms: [
                {
                  identifier: 'code',
                  value: 'SAT',
                  type: 'Eq',
                  privateOperator: true,
                },
              ],
              subJoin: null,
              joinType: 'INNER',
            },
          ],
          values: {},
        },
      }
    );
  }

  saveSunOutageBySatelliteId(
    satelliteId: number,
    sunOutages: SunOutageAvailabilityDefinitionDTO[]
  ): Observable<string[]> {
    return this.apiService.create<string[]>(
      `${this._endpointURL}/sun-outages/satellite/${satelliteId}`,
      {
        body: sunOutages,
      }
    );
  }
}
