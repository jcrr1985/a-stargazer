import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Role } from '@constants/app-roles';
import { RolesService } from '@services/roles/roles.service';
import { UsersService } from '@services/users/users.service';
import { FieldConfiguration } from 'projects/dynamic-form/src/lib/models/models';
import { Subscription, forkJoin } from 'rxjs';

@Component({
  selector: 'app-change-roles-dialog',
  templateUrl: './change-roles-dialog.component.html',
  styleUrls: ['./change-roles-dialog.component.scss'],
})
export class ChangeRolesDialogComponent implements OnInit, OnDestroy {
  selected: Role[] = [];
  forkJoinSubscription: Subscription = new Subscription();

  constructor(
    private readonly dialogRef: MatDialogRef<ChangeRolesDialogComponent>,
    private readonly rolesService: RolesService,
    private readonly usersService: UsersService
  ) {}

  fields!: FieldConfiguration[];

  formChanges(form: FormGroupDirective) {
    form.control.get('roles')?.valueChanges.subscribe((value) => {
      this.selected = value;
    });
  }

  ngOnInit(): void {
    this.forkJoinSubscription = forkJoin([
      this.rolesService.getAllRoles(),
      this.usersService.getCurrentUserAuthentication(),
    ]).subscribe(([roles, currentUserPermissions]) => {
      const newRoles: any = roles.map((rol) => rol);

      const rolesWithPrefix = [
        newRoles[0].administrators,
        newRoles[0].users,
        newRoles[0].resource_manager,
        newRoles[0].pricing_admin,
        newRoles[0].viewer,
        newRoles[0].billing_admin,
      ];

      const rolesWithoutPrefix = rolesWithPrefix.map((role) => {
        const roleName = role
          .replace('ROLE_', '')
          .replace(/_/g, ' ')
          .toLowerCase();
        return roleName.charAt(0).toUpperCase() + roleName.slice(1);
      });

      this.fields = [
        {
          type: 'select',
          options: rolesWithoutPrefix,
          name: 'roles',
          label: 'Roles',
          multiple: true,
          value: currentUserPermissions.roles,
        },
      ];
    });
  }

  ngOnDestroy(): void {
    this.forkJoinSubscription.unsubscribe();
  }

  discardChanges(): void {
    this.dialogRef.close();
  }

  saveChanges(): void {
    this.usersService.updateCurrentUserRoles(this.selected).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
