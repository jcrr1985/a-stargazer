import { Permission } from '@constants/app-permissions';
import { Role } from '@constants/app-roles';
import { UserGroup } from '@constants/app-user-groups';
import { DomainItem } from '@models/domain-item.model';
import { UserPermissionDTO } from '@models/user-permission-dto';
import { of } from 'rxjs';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let apiServiceSpy: { create: jasmine.Spy; read: jasmine.Spy };
  let mockUserGroups: UserGroup[];
  let mockRoles: Role[];
  let mockPermissions: Permission[];
  let mockUserPermissions: UserPermissionDTO;
  let mockGroupDomainItem: DomainItem;

  beforeEach(() => {
    mockPermissions = [Permission.DEFAULT_READ, Permission.DEFAULT_READ];
    mockUserGroups = [UserGroup.EVC, UserGroup.FINANCE];
    mockRoles = [Role.ADMINISTRATORS];
    mockUserPermissions = {
      permissions: mockPermissions,
      roles: mockRoles,
      userName: 'External',
      email: 'External',
      initials: 'External',
      userPrincipalName: 'External',
    };
    mockGroupDomainItem = {
      id: 1948,
      version: 340,
      entityTrackerIdBean: null,
      code: 'PM',
      isoCode: null,
      externalCode: null,
      label: 'Project managers',
      sequence: 5,
      extView: true,
      externalLabel: null,
      itemStatus: 'ACTIVE',
      isModified: false,
      keyCode: 'USER_GROUP@PM',
      isRemoved: false,
      name: 'Project managers',
      entityNameEnum: null,
    };

    apiServiceSpy = jasmine.createSpyObj('ApiService', ['read', 'create']);
    service = new UsersService(apiServiceSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch authentication data', () => {
    apiServiceSpy.read.and.returnValue(of(mockUserPermissions));

    service.getCurrentUserAuthentication().subscribe((res) => {
      expect(res).toEqual(mockUserPermissions);
    }, fail);

    expect(apiServiceSpy.read).toHaveBeenCalledTimes(1);
    expect(apiServiceSpy.read).toHaveBeenCalledWith('/users/authentication');
  });

  it('should update roles using header data', () => {
    apiServiceSpy.read.and.returnValue(of(mockUserPermissions));

    service.updateCurrentUserRoles(mockRoles).subscribe((res) => {
      expect(res).toEqual(mockUserPermissions);
    }, fail);

    expect(apiServiceSpy.read).toHaveBeenCalledTimes(1);
    expect(apiServiceSpy.read).toHaveBeenCalledWith('/users/authentication', {
      headers: { ROLES: mockRoles },
    });
  });

  it('should fetch groups by user email', () => {
    const testEmail = 'doe@ebu.ch';
    apiServiceSpy.read.and.returnValue(of(mockUserGroups));

    service.getUserGroupsByEmail(testEmail).subscribe((res) => {
      expect(res).toEqual(mockUserGroups);
    }, fail);

    expect(apiServiceSpy.read).toHaveBeenCalledTimes(1);
    expect(apiServiceSpy.read).toHaveBeenCalledWith(
      `/users/groups/${testEmail}`
    );
  });

  it('should update groups by user email', () => {
    const testEmail = 'doe@ebu.ch';
    apiServiceSpy.create.and.returnValue(of());

    service
      .updateUserGroupsByEmail(testEmail, [mockGroupDomainItem])
      .subscribe((res) => {
        expect(res).not.toBeDefined();
      }, fail);

    expect(apiServiceSpy.create).toHaveBeenCalledTimes(1);
    expect(apiServiceSpy.create).toHaveBeenCalledWith(
      `/users/groups/${testEmail}/update`,
      {
        body: [mockGroupDomainItem],
      }
    );
  });
});
