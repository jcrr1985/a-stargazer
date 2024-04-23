import { Role } from '@constants/app-roles';
import { of } from 'rxjs';
import { RolesService } from './roles.service';

describe('RolesService', () => {
  let service: RolesService;
  let apiServiceSpy: { read: jasmine.Spy };
  let fakeRoles: Role[];

  beforeEach(() => {
    fakeRoles = [Role.ADMINISTRATORS];
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['read']);
    service = new RolesService(apiServiceSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all roles', () => {
    apiServiceSpy.read.and.returnValue(of(fakeRoles));

    service.getAllRoles().subscribe((res) => {
      expect(res).toEqual(fakeRoles);
    }, fail);

    expect(apiServiceSpy.read).toHaveBeenCalledTimes(1);
    expect(apiServiceSpy.read).toHaveBeenCalledWith('/roles');
  });
});
