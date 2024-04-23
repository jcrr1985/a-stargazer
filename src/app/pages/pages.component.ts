import { Component, OnDestroy } from '@angular/core';
import { NavigationHistoryService } from '@services/navigation-history/navigation-history.service';
import { TabsService } from '@services/tabs/tabs.service';
import { NeosTreeNode } from '@shared/components/tree/tree.component';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnDestroy {
  private _onDestroy$ = new Subject();
  showTree = false;
  treeData: NeosTreeNode[] = [];

  constructor(
    private readonly navigationHistoryService: NavigationHistoryService,
    private readonly tabsService: TabsService
  ) {
    this.treeData = this.navigationHistoryService.getNavigationHistoryTree();
    this.navigationHistoryService.historyChanged$
      .pipe(
        tap(() => {
          this.showTree = false;
          this.treeData =
            this.navigationHistoryService.getNavigationHistoryTree();
        }),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }

  get tabs() {
    return this.tabsService.openedTabs;
  }

  get currentTab() {
    return this.tabsService.getActiveTabData();
  }

  toggleTree = () => {
    this.showTree = !this.showTree;
  };

  ngOnDestroy(): void {
    this._onDestroy$.next();
  }
}
