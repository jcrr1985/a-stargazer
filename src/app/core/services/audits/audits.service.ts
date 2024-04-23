import { Injectable } from '@angular/core';
import { EntityType } from '@constants/entities';
import { EntityAuditDTO } from '@models/entity-audit-dto.model';
import { ApiService } from '@services/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuditsService {
  private _endpointURL = '/audits';

  constructor(private readonly apiService: ApiService) {}

  getAuditsByEntityId(
    entity: EntityType,
    entityId: number
  ): Observable<EntityAuditDTO[]> {
    return this.apiService.read<EntityAuditDTO[]>(
      `${this._endpointURL}/${entity.toUpperCase()}/${entityId}`
    );
  }
}
