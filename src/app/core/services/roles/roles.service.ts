import { Injectable } from '@angular/core';
import { Role } from '@constants/app-roles';
import { ApiService } from '@services/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private _endpointURL = '/roles';

  constructor(private readonly apiService: ApiService) {}

  getAllRoles(): Observable<Role[]> {
    return this.apiService.read<Role[]>(`${this._endpointURL}`);
  }
}
