import { Injectable } from '@angular/core';
import { Role } from '@constants/app-roles';
import { DomainItem } from '@models/domain-item.model';
import { DomainListsResponseDTO } from '@models/domain-lists-response-dto.model';
import { DomainParameter } from '@models/domain-parameter.model';
import { ApiService } from '@services/api/api.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DomainsService {
  private _endpointURL = '/domains';

  constructor(private readonly apiService: ApiService) {}

  getDomains(): Observable<DomainParameter[]> {
    return this.apiService.read<DomainParameter[]>(`${this._endpointURL}`);
  }

  listAll(): Observable<DomainListsResponseDTO> {
    return this.apiService.read<DomainListsResponseDTO>(
      `${this._endpointURL}/list-all`
    );
  }

  saveAll(saveDto: DomainListsResponseDTO) {
    return this.apiService.update<DomainListsResponseDTO>(
      `${this._endpointURL}/save-all`,
      { body: saveDto, headers: { ROLES: Object.values(Role).join() } }
    );
  }

  searchDomainEntityItems(
    domainEntity: string
  ): Observable<DomainItem[] | any[]> {
    return this.apiService.read<DomainItem[]>(
      `${this._endpointURL}/domain/${encodeURIComponent(domainEntity)}/items`
    );
  }
}
