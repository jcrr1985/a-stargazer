import { Injectable } from '@angular/core';
import { ResourceProfile } from '@models/resource-profile.model';
import { ApiService } from '@services/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResourceProfilesService {
  private _endpointURL = '/resource-profiles';

  constructor(private readonly apiService: ApiService) {}

  getResourceProfiles(): Observable<ResourceProfile[]> {
    return this.apiService.create<ResourceProfile[]>(
      `${this._endpointURL}/search`,
      {
        body: {
          orders: [
            {
              identifier: 'code',
              asc: true,
            },
          ],
          terms: [],
          relations: [],
          values: {},
        },
      }
    );
  }
}
