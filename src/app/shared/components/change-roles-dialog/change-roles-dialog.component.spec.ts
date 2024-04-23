import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Role } from '@constants/app-roles';
import { UserPermissionDTO } from '@models/user-permission-dto';
import { RolesService } from '@services/roles/roles.service';
import { UsersService } from '@services/users/users.service';
import { SharedModule } from '@shared/shared.module';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { SelectConfiguration } from 'projects/dynamic-form/src/lib/models/models';
import { of } from 'rxjs';
import { ChangeRolesDialogComponent } from './change-roles-dialog.component';

describe('ChangeRolesDialogComponent', () => {
  let component: ChangeRolesDialogComponent;
  let fixture: ComponentFixture<ChangeRolesDialogComponent>;

  let rolesService: RolesService;
  let usersService: UsersService;
  let matDialogRef: jasmine.SpyObj<MatDialogRef<ChangeRolesDialogComponent>>;

  beforeEach(async () => {
    matDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [ChangeRolesDialogComponent],
      providers: [
        {
          provide: RolesService,
          useValue: {
            getAllRoles: () => of([Role.ADMINISTRATORS, Role.PRICING_ADMIN]),
          },
        },
        {
          provide: UsersService,
          useValue: {
            getCurrentUserAuthentication: () =>
              of({
                permissions: [],
                roles: [],
                userName: '',
                email: '',
                initials: '',
                userPrincipalName: '',
              }),
            updateCurrentUserRoles: () =>
              of({
                permissions: [],
                roles: [],
                userName: '',
                email: '',
                initials: '',
                userPrincipalName: '',
              }),
          },
        },
        {
          provide: MatDialogRef,
          useValue: matDialogRef,
        },
      ],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterTestingModule,
        TranslateTestingModule.withTranslations({ en: {} }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    rolesService = TestBed.inject(RolesService);
    usersService = TestBed.inject(UsersService);

    fixture = TestBed.createComponent(ChangeRolesDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all roles on init', () => {
    const roles: Role[] = [Role.ADMINISTRATORS, Role.PRICING_ADMIN];

    spyOn(rolesService, 'getAllRoles').and.returnValue(of(roles));
    spyOn(usersService, 'getCurrentUserAuthentication').and.returnValue(
      of({
        roles: [Role.ADMINISTRATORS],
      } as UserPermissionDTO)
    );

    fixture.detectChanges();

    expect((component.fields[0] as SelectConfiguration).options).toEqual(roles);
    expect((component.fields[0] as SelectConfiguration).value).toEqual([
      Role.ADMINISTRATORS,
    ]);
  });

  it('should discard changes', () => {
    component.discardChanges();

    expect(matDialogRef.close).toHaveBeenCalled();
  });

  it('should save changes', () => {
    spyOn(usersService, 'updateCurrentUserRoles').and.returnValue(
      of({
        permissions: [],
        roles: [],
        userName: '',
        email: '',
        initials: '',
        userPrincipalName: '',
      })
    );
    component.selected = [Role.ADMINISTRATORS];

    component.saveChanges();

    expect(usersService.updateCurrentUserRoles).toHaveBeenCalledWith([
      Role.ADMINISTRATORS,
    ]);
    expect(matDialogRef.close).toHaveBeenCalled();
  });
});
