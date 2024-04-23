import { Injectable } from '@angular/core';
import { EntityType, propertiesByEntityType } from '@constants/entities';
import { NavigationHistoryNode } from '@models/navigation-history-node.model';
import { TabDetail } from '@services/tabs/tabs.service';
import { NeosTreeNode } from '@shared/components/tree/tree.component';
import { sortArrayByObjectKey } from '@shared/utils/helpers';
import { Subject } from 'rxjs';

const NAVIGATION_HISTORY_STORAGE_KEY = 'neosNavigationHistory';
@Injectable({
  providedIn: 'root',
})
export class NavigationHistoryService {
  private _historyChangedSource = new Subject<void>();
  private _navigationRequestSource = new Subject<NavigationHistoryNode>();

  get historyChanged$() {
    return this._historyChangedSource.asObservable();
  }

  get navigationRequested$() {
    return this._navigationRequestSource.asObservable();
  }

  constructor() {
    const initializedHistoryObject: any = {};
    const userHistory: any = JSON.parse(
      localStorage.getItem(NAVIGATION_HISTORY_STORAGE_KEY) ||
        JSON.stringify(initializedHistoryObject)
    );

    if (userHistory.all) {
      initializedHistoryObject.all = userHistory.all;
    }
    Object.values(EntityType).forEach((entityType) => {
      if (userHistory[entityType]) {
        initializedHistoryObject[entityType] = userHistory[entityType];
      }
    });

    localStorage.setItem(
      NAVIGATION_HISTORY_STORAGE_KEY,
      JSON.stringify(initializedHistoryObject)
    );
  }

  navigateToNode(navigationNode: NavigationHistoryNode): void {
    this._navigationRequestSource.next(navigationNode);
  }

  getNavigationHistoryTree(): NeosTreeNode[] {
    const userHistory: Record<EntityType, NavigationHistoryNode[]> = JSON.parse(
      localStorage.getItem(NAVIGATION_HISTORY_STORAGE_KEY)!
    );
    const userHistoryTree: NeosTreeNode[] = sortArrayByObjectKey(
      Object.entries(userHistory).map(([entity, children]) => {
        let icon = '';
        const mappedChildren = (children as NavigationHistoryNode[]).map(
          (navigationNode) => {
            icon =
              propertiesByEntityType.get(navigationNode.entity)?.icon || '';

            return {
              name: navigationNode.displayLabel,
              icon,
              callback: () => this.navigateToNode(navigationNode),
            } as NeosTreeNode;
          }
        );

        return {
          nameTranslateKey: entity,
          children: mappedChildren,
          icon,
        } as NeosTreeNode;
      }),
      'nameTranslateKey'
    );

    return [
      { nameTranslateKey: 'mostRecentlyUsed', children: userHistoryTree },
    ];
  }

  addNavigationHistory(
    entity: EntityType,
    displayLabel: string,
    tabDetails: TabDetail
  ) {
    const userHistory = JSON.parse(
      localStorage.getItem(NAVIGATION_HISTORY_STORAGE_KEY)!
    );

    const historyElement: NavigationHistoryNode = {
      entity,
      displayLabel,
      tabDetails,
    };

    if (!userHistory.all) {
      userHistory.all = [];
    }
    if (!userHistory[entity]) {
      userHistory[entity] = [];
    }

    if (
      !userHistory.all.some(
        (elem: NavigationHistoryNode) =>
          historyElement.displayLabel === elem.displayLabel
      )
    ) {
      userHistory.all = [historyElement, ...userHistory.all];
      userHistory.all.splice(5);
    }

    if (
      !userHistory[entity].some(
        (elem: NavigationHistoryNode) =>
          historyElement.displayLabel === elem.displayLabel
      )
    ) {
      userHistory[entity] = [historyElement, ...userHistory[entity]];
      userHistory[entity].splice(5);
    }

    localStorage.setItem(
      NAVIGATION_HISTORY_STORAGE_KEY,
      JSON.stringify(userHistory)
    );

    this._historyChangedSource.next();
  }
}
