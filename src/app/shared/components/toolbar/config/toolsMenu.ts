import { MatDialog } from '@angular/material/dialog';
import { appRoutes } from '@constants/app-routes';
import { EntityType } from '@constants/entities';
import { TabsService } from '@services/tabs/tabs.service';
import { ChangeRolesDialogComponent } from '@shared/components/change-roles-dialog/change-roles-dialog.component';
import { UserGroupDialogComponent } from '@shared/components/user-group-dialog/user-group-dialog.component';
import { DomainManagerComponent } from 'src/app/pages/domain-manager/domain-manager.component';
import { MenuDivider, NeosMenuItem } from '../../menu/menu.component';

export const getToolsMenu = (
  tabsService: TabsService,
  dialog: MatDialog
): NeosMenuItem[] => [
  // {
  //   icon: 'bug_report',
  //   iconColor: 'red',
  //   labelTranslateKey: 'reportIssue',
  // },
  // MenuDivider,

  {
    icon: 'settings',
    labelTranslateKey: 'domainsManager',
    callback: () =>
      tabsService.addUniqueTab(
        'domainsManager',
        DomainManagerComponent,
        EntityType.TOOLS,
        {},
        [appRoutes.DOMAIN_MANAGER]
      ),
  },
  {
    icon: 'settings',
    labelTranslateKey: 'discountManager',
    callback: () =>
      tabsService.addUniqueTab(
        'discountManager',
        DomainManagerComponent,
        EntityType.TOOLS,
        {},
        [appRoutes.DISCOUNT_MANAGER]
      ),
  },
  MenuDivider,

  {
    icon: 'settings',
    labelTranslateKey: 'changeRoles',
    callback: () =>
      dialog.open(ChangeRolesDialogComponent, {
        width: '800px',
        disableClose: true,
      }),
  },
  {
    icon: 'settings',
    labelTranslateKey: 'userGroups',
    callback: () =>
      dialog.open(UserGroupDialogComponent, {
        width: '800px',
        disableClose: true,
      }),
  },

  // MenuDivider,
  // {
  //   icon: 'monitor_heart',
  //   labelTranslateKey: 'monitorApplication',
  // },
];
