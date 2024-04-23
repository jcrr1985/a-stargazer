import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { UserGroup } from '@constants/app-user-groups';
import { DomainItem } from '@models/domain-item.model';
import { DomainsService } from '@services/domains/domains.service';
import { UsersService } from '@services/users/users.service';
import { SharedModule } from '@shared/shared.module';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { of } from 'rxjs';
import { UserGroupDialogComponent } from './user-group-dialog.component';

describe('UserGroupDialogComponent', () => {
  let component: UserGroupDialogComponent;
  let fixture: ComponentFixture<UserGroupDialogComponent>;

  let domainsService: DomainsService;
  let usersService: UsersService;
  let matDialogRef: jasmine.SpyObj<MatDialogRef<UserGroupDialogComponent>>;

  beforeEach(async () => {
    matDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [UserGroupDialogComponent],
      providers: [
        {
          provide: DomainsService,
          useValue: {
            searchDomainEntityItems: () =>
              of([{ code: UserGroup.EVC, label: 'EVC' } as DomainItem]),
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
            updateUserGroupsByEmail: () => of({}),
            getUserGroupsByEmail: () => of([UserGroup.EVC]),
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
    domainsService = TestBed.inject(DomainsService);
    usersService = TestBed.inject(UsersService);
    fixture = TestBed.createComponent(UserGroupDialogComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get available groups and set user groups on init', () => {
    spyOn(domainsService, 'searchDomainEntityItems').and.returnValue(
      of([{ code: UserGroup.EVC, label: 'EVC' } as DomainItem])
    );
    spyOn(usersService, 'getUserGroupsByEmail').and.returnValue(
      of([UserGroup.EVC])
    );

    component.ngOnInit();

    expect(component.availableGroups.length).toBeGreaterThan(0);
    expect(component.groupsControl.value).toEqual([
      { code: UserGroup.EVC, label: 'EVC' } as DomainItem,
    ]);
  });

  it('should handle group selection change', () => {
    const event: MatSelectChange = {
      value: [{ code: UserGroup.EVC, label: 'EVC' } as DomainItem],
      source: {
        value: null,
      } as MatSelect,
    };

    component.groupsControl = new FormControl([
      { code: UserGroup.EVC, label: 'EVC' } as DomainItem,
    ]);

    component.onGroupsSelectionChange(event);

    expect(component.groupsControl.value).toEqual([
      { code: UserGroup.EVC, label: 'EVC' } as DomainItem,
    ]);
  });

  it('should save changes', () => {
    component.saveChanges();
    spyOn(usersService, 'updateUserGroupsByEmail').and.returnValue(
      of(undefined)
    );
    component.groupsControl = new FormControl([
      {
        code: UserGroup.EVC,
        label: UserGroup.EVC,
        name: UserGroup.EVC,
        entityTrackerIdBean: null,
        isRemoved: false,
        entityNameEnum: null,
        new: false,
        isModified: false,
      } as DomainItem,
    ]);

    component.saveChanges();

    fixture.detectChanges();

    expect(usersService.updateUserGroupsByEmail).toHaveBeenCalledWith('', [
      {
        code: UserGroup.EVC,
        label: UserGroup.EVC,
        name: UserGroup.EVC,
        entityTrackerIdBean: null,
        isRemoved: false,
        entityNameEnum: null,
        new: false,
        isModified: false,
      } as DomainItem,
    ]);
    expect(matDialogRef.close).toHaveBeenCalled();
  });

  it('should return the group code itself if no translation key is found', () => {
    const unknownGroup: DomainItem = {
      code: 'UNKNOWN_CODE',
      label: 'Unknown',
      version: 1,
      sequence: 1,
      keyCode: 'UNKNOWN_CODE',
      isoCode: 'UNKNOWN_CODE',
      extView: false,
      itemStatus: 'UNKNOWN_CODE',
      id: null,
    };
    const translateKey = component.getGroupTranslateKey(unknownGroup);
    expect(translateKey).toBe('UNKNOWN_CODE');
  });
});
