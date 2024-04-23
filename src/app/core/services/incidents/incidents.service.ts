import { Injectable } from '@angular/core';
import { CategoryIncidentDTO } from '@models/category-incident-dto.model';
import { IncidentDTO } from '@models/incident-dto.model';
import { IncidentOwnerDTO } from '@models/incident-owner-dto.model';
import { SaveIncidentRequestDTO } from '@models/save-incident-request-dto.model';
import { SubcategoryIncidentDTO } from '@models/subcategory-incident-dto.model';
import { ApiService } from '@services/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncidentsService {
  private _endpointURL = '/incidents';

  constructor(private readonly apiService: ApiService) {}

  getIncident(incidentId: number | string): Observable<IncidentDTO> {
    return this.apiService.read<IncidentDTO>(
      `${this._endpointURL}/${incidentId}?full=true`
    );
  }

  saveIncident(incidentDto: SaveIncidentRequestDTO): Observable<IncidentDTO> {
    return this.apiService.create<IncidentDTO>(this._endpointURL, {
      body: incidentDto,
    });
  }

  getFilteredCategories(
    searchCriteria: string
  ): Observable<CategoryIncidentDTO[]> {
    return this.apiService.create<CategoryIncidentDTO[]>(
      `${this._endpointURL}/category/search`,
      {
        body: {
          orders: [{ identifier: 'sequence', asc: true }],
          terms: [
            {
              identifier: 'description',
              value: searchCriteria,
              type: 'Like',
              likeType: 'BEGIN',
              operator: true,
            },
            {
              identifier: 'active',
              value: true,
              type: 'Eq',
              privateOperator: true,
            },
          ],
        },
      }
    );
  }

  getSubcategoriesByCategoryId(
    categoryId: number
  ): Observable<SubcategoryIncidentDTO[]> {
    return this.apiService.create<SubcategoryIncidentDTO[]>(
      `${this._endpointURL}/subcategory/search`,
      {
        body: {
          orders: [
            {
              identifier: 'sequence',
              asc: true,
            },
          ],
          terms: [
            {
              identifier: 'active',
              value: true,
              type: 'Eq',
              privateOperator: true,
            },
          ],
          relations: [
            {
              type: 'Join',
              relationEntity: 'incidentCategory',
              terms: [
                {
                  identifier: 'id',
                  value: categoryId,
                  type: 'Eq',
                  privateOperator: true,
                },
              ],
              subjoin: null,
              joinType: 'INNER',
            },
          ],
        },
      }
    );
  }

  getAllOwners(): Observable<IncidentOwnerDTO[]> {
    return this.apiService.create<IncidentOwnerDTO[]>(
      `${this._endpointURL}/owner/search`,
      {
        body: {
          orders: [{ identifier: 'sequence', asc: true }],
          terms: [
            {
              identifier: 'active',
              value: true,
              type: 'Eq',
              privateOperator: true,
            },
          ],
        },
      }
    );
  }
}
