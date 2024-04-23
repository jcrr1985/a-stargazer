import { Injectable } from '@angular/core';
import { Role } from '@constants/app-roles';
import { UserGroup } from '@constants/app-user-groups';
import { DomainItem } from '@models/domain-item.model';
import { UserPermissionDTO } from '@models/user-permission-dto';
import { ApiService } from '@services/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _endpointURL = '/users';

  constructor(private readonly apiService: ApiService) {}

  getCurrentUserAuthentication(): Observable<UserPermissionDTO> {
    return this.apiService.read<UserPermissionDTO>(
      `${this._endpointURL}/authentication`
    );
  }

  updateCurrentUserRoles(rolesToSet: Role[]): Observable<UserPermissionDTO> {
    return this.apiService.read<UserPermissionDTO>(
      `${this._endpointURL}/authentication`,
      { headers: { ROLES: rolesToSet } }
    );
  }

  getUserGroupsByEmail(email: string): Observable<UserGroup[]> {
    return this.apiService.read<UserGroup[]>(
      `${this._endpointURL}/groups/${email}`
    );
  }

  updateUserGroupsByEmail(
    email: string,
    groupsToSet: DomainItem[]
  ): Observable<void> {
    return this.apiService.create<void>(
      `${this._endpointURL}/groups/${email}/update`,
      { body: groupsToSet }
    );
  }
}
