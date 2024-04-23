import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { UserGroup } from '@constants/app-user-groups';
import { DomainEntity } from '@constants/domain-entities';
import { DomainItem } from '@models/domain-item.model';
import { UserPermissionDTO } from '@models/user-permission-dto';
import { DomainsService } from '@services/domains/domains.service';
import { UsersService } from '@services/users/users.service';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-group-dialog',
  templateUrl: './user-group-dialog.component.html',
  styleUrls: ['./user-group-dialog.component.scss'],
})
export class UserGroupDialogComponent implements OnInit, OnDestroy {
  groupsControl: FormControl = new FormControl(
    [],
    [Validators.required, Validators.maxLength(2)]
  );

  currentUserPermissions!: UserPermissionDTO;

  availableGroups: DomainItem[] = [];

  userGroupsTranslateKey = new Map<UserGroup, string>([
    [UserGroup.EVC, 'evc'],
    [UserGroup.CUSTOMER_SERVICE_DESK, 'customerServiceDesk'],
    [UserGroup.PROJECT_MANAGER, 'projectManagers'],
    [UserGroup.FINANCE, 'finance'],
    [UserGroup.NEWS, 'news'],
    [UserGroup.RADIO, 'radio'],
    [UserGroup.PLANNING, 'planning'],
  ]);

  domainServiceSubscription: Subscription = new Subscription();

  userServicesSubscription: Subscription = new Subscription();

  constructor(
    private readonly dialogRef: MatDialogRef<UserGroupDialogComponent>,
    private readonly usersService: UsersService,
    private readonly domainsService: DomainsService
  ) {}

  ngOnInit(): void {
    this.domainServiceSubscription = this.domainsService
      .searchDomainEntityItems(DomainEntity.USER_GROUP)
      .pipe(
        tap((domainItems: DomainItem[]) => {
          this.availableGroups = domainItems;
        }),
        switchMap(() => this.usersService.getCurrentUserAuthentication()),
        tap((currentUserPermissions: UserPermissionDTO) => {
          this.currentUserPermissions = currentUserPermissions;
        }),
        switchMap((currentUserPermissions: UserPermissionDTO) =>
          this.usersService.getUserGroupsByEmail(currentUserPermissions.email)
        )
      )
      .subscribe((groups: UserGroup[]) => {
        const userGroups = groups.map((groupCode) =>
          this.availableGroups.find(
            (domainItem) => domainItem.code === groupCode
          )
        );

        this.groupsControl.setValue(userGroups);
      });
  }

  ngOnDestroy(): void {
    this.domainServiceSubscription.unsubscribe();
    this.userServicesSubscription.unsubscribe();
  }

  onGroupsSelectionChange(event: MatSelectChange): void {
    this.groupsControl.setValue(event.value);
  }

  getGroupTranslateKey(group: DomainItem): string {
    return (
      this.userGroupsTranslateKey.get(group.code as UserGroup) ?? group.code
    );
  }

  saveChanges(): void {
    const saveDTO: DomainItem[] = this._generateSaveDTO();

    this.userServicesSubscription = this.usersService
      .updateUserGroupsByEmail(this.currentUserPermissions.email, saveDTO)
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  private _generateSaveDTO(): DomainItem[] {
    return this.groupsControl.value.map((group: DomainItem) => {
      const { businessKey, ...groupNoBusinessKey } = group;

      return {
        ...groupNoBusinessKey,
        name: group.label,
        entityTrackerIdBean: null,
        isRemoved: false,
        entityNameEnum: null,
        new: false,
        isModified: false,
      };
    });
  }
}
