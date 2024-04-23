import { Permission } from '@constants/app-permissions';
import { Role } from '@constants/app-roles';

export interface UserPermissionDTO {
  permissions: Permission[];
  roles: Role[];
  userName: string;
  email: string;
  initials: string;
  userPrincipalName: string;
}
