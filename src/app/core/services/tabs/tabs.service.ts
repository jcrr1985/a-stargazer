import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { appRoutes } from '@constants/app-routes';
import { EntityType, propertiesByEntityType } from '@constants/entities';
import { NavigationHistoryService } from '@services/navigation-history/navigation-history.service';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData,
} from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { v4 as uuid } from 'uuid';

export interface TabDetail {
  id: string;
  label: string;
  component: any;
  isEdited: boolean;
  tabRoute: string[];
  contextData?: any;
  entity?: EntityType;
  color?: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  constructor(
    private readonly navigationHistoryService: NavigationHistoryService,
    private readonly dialog: MatDialog,
    private readonly router: Router
  ) {
    this.navigationHistoryService.navigationRequested$.subscribe(
      ({ tabDetails }) => {
        const { id, component, entity, contextData, tabRoute } = tabDetails;

        this.addUniqueTab(id, component, entity, contextData, tabRoute);
      }
    );
  }

  private _activeTabIndex = 0;

  get activeTabIndex() {
    return this._activeTabIndex;
  }

  set activeTabIndex(newIndex: number) {
    if (newIndex < 0 || newIndex >= this._openedTabs.length) {
      return;
    }

    this._activeTabIndex = newIndex;
  }

  private _activeTabId = '';
  private _openedTabs: TabDetail[] = [];

  public get activeTabId(): string {
    return this._activeTabId;
  }

  public set activeTabId(newId: string) {
    if (this._openedTabs.some((tab) => tab.id === newId)) {
      this._activeTabId = newId;
    }
  }

  public get openedTabs(): TabDetail[] {
    return this._openedTabs;
  }

  /**
   * This method is used to open an entity search tab which could be
   * duplicated
   * @param label Tab label to be displayed
   * @param component Component to be rendered inside the tab
   * @param entity Used to retrieve tab icon and bg-color.
   * @param contextData (Optional) Tab data that want to be stored as long as tab exists.
   * @param route (Optional) Additional route segments appended between entity and id
   *
   */
  public addTab(
    label: string,
    component: ComponentType<any>,
    entity: EntityType,
    contextData?: any,
    route?: string[]
  ): void {
    const id = uuid();
    let icon, color;
    const tabRoute = [entity, ...(route ?? []), id];

    const entityProperties = propertiesByEntityType.get(entity)!;
    icon = entityProperties.icon;
    color = entityProperties.color;

    const tabDetails: TabDetail = {
      id,
      entity,
      component,
      contextData,
      tabRoute,
      label,
      isEdited: false,
      color,
      icon,
    };
    const newLength = this.openedTabs.push(tabDetails);

    this.updateActiveTab(newLength - 1);
  }

  /**
   * This method is used to open an a tab which could not be duplicated
   * @param tabId A unique identifier for the tab (usually entity id)
   * @param component Component to be rendered inside the tab
   * @param entity (Optional) Used to persist history and retrieve tab icon and bg-color.
   * @param contextData (Optional) Tab data that want to be stored as long as tab exists.
   * @param route (Optional) Route segment to identify the tab, otherwise, tabId.
   */
  public addUniqueTab(
    tabId: string,
    component: ComponentType<any>,
    entity?: EntityType,
    contextData?: any,
    route?: string[]
  ): void {
    if (this._openedTabs.some((tab) => tab.id === tabId)) {
      const reopenTabIndex = this.openedTabs.findIndex(
        (tab) => tab.id === tabId
      );

      this.updateActiveTab(reopenTabIndex);

      return;
    }

    const tabRoute = route ?? [tabId];

    let entityProperties = { color: '', icon: '' };

    if (entity) {
      entityProperties = propertiesByEntityType.get(entity)!;
    }

    const { color, icon } = entityProperties;

    const tabDetails: TabDetail = {
      id: tabId,
      entity,
      component,
      contextData,
      tabRoute,
      label: tabId,
      isEdited: false,
      color,
      icon,
    };

    const newLength = this.openedTabs.push(tabDetails);

    this.navigationHistoryService.addNavigationHistory(
      entity ?? EntityType.TOOLS,
      tabId,
      tabDetails
    );

    this.updateActiveTab(newLength - 1);
  }

  /**
   * This method is used remove a tab with a given Id
   * @param tabId A unique identifier for the tab
   * @param entity Entity type. Used to store navigation history
   */
  public async removeTab(tabIdToRemove: string): Promise<void> {
    const removeTabIndex = this.openedTabs.findIndex(
      (tab) => tab.id === tabIdToRemove
    );

    if (removeTabIndex === -1) {
      return;
    }

    if (this.openedTabs[removeTabIndex].isEdited) {
      const userConfirmedDiscard = await this._openDiscardDialog();

      if (!userConfirmedDiscard) {
        return;
      }
    }

    const tabCount = this.openedTabs.length;

    if (tabCount === 1) {
      this._openedTabs = [];
      this._activeTabId = '';

      this.router.navigate([appRoutes.HOME]);

      return;
    }

    if (tabIdToRemove === this.activeTabId) {
      let tabIdToFocus: string;

      if (removeTabIndex === tabCount - 1) {
        tabIdToFocus = this._openedTabs[removeTabIndex - 1].id;
      } else {
        tabIdToFocus = this._openedTabs[removeTabIndex + 1].id;
      }

      this._openedTabs = this._openedTabs.filter(
        (tab) => tab.id !== tabIdToRemove
      );

      const index = this.openedTabs.findIndex((tab) => tab.id === tabIdToFocus);

      this.updateActiveTab(index);

      return;
    }
  }

  /**
   * Update active tab state by a given index
   * @param newTabIndex tab index to set as active
   */
  public updateActiveTab(newTabIndex: number) {
    // This first navigation to a base path is not visible to the user but
    // allow us to re-render a component when navigating between different tabs
    // with same content.
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._activeTabId = this.openedTabs[newTabIndex].id;
      this._activeTabIndex = newTabIndex;
      this.router.navigate(this.openedTabs[newTabIndex].tabRoute);
    });
  }

  public setTabEditing(tabId: string, editValue: boolean): void {
    const tabToUpdate = this._openedTabs.find((tab) => tab.id === tabId);

    if (tabToUpdate) {
      tabToUpdate.isEdited = editValue;
    }
  }

  public getActiveTabData(): TabDetail {
    return this.openedTabs.find((tab) => tab.id === this._activeTabId)!;
  }

  public setActiveTabContext(contextData: any): TabDetail {
    const tabToUpdate = this.openedTabs.find(
      (tab) => tab.id === this._activeTabId
    );

    if (tabToUpdate) {
      tabToUpdate.contextData = contextData;
    }

    return tabToUpdate!;
  }

  public patchActiveTabContext(contextData: any): TabDetail {
    const tabToUpdate = this.openedTabs.find(
      (tab) => tab.id === this._activeTabId
    );

    if (tabToUpdate) {
      tabToUpdate.contextData = { ...tabToUpdate.contextData, ...contextData };
    }

    return tabToUpdate!;
  }

  private _openDiscardDialog(): Promise<boolean> {
    const confirmationDialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      {
        width: '500px',
        data: {
          titleTranslateKey: 'confirmation',
          contentTranslateKey: 'modificationsLostContinue',
          titleIcon: 'info',
        } as ConfirmationDialogData,
      }
    );

    return confirmationDialogRef.afterClosed().toPromise();
  }
}
