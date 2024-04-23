import { Component, HostListener } from '@angular/core';
import { TabsService } from '@services/tabs/tabs.service';
import { arrayEquals } from '@shared/utils/helpers';

@Component({
  selector: 'app-tabbed-container',
  templateUrl: './tabbed-container.component.html',
  styleUrls: ['./tabbed-container.component.scss'],
})
export class TabbedContainerComponent {
  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    const urlSegments = event.target.location.pathname.split('/');
    urlSegments.splice(0, 1);
    const backToTabIndex = this.tabsService.openedTabs.findIndex((tab) =>
      arrayEquals(tab.tabRoute, urlSegments)
    );
    this.tabsService.updateActiveTab(backToTabIndex);
  }
  constructor(private readonly tabsService: TabsService) {}

  get activeTabIndex() {
    return this.tabsService.activeTabIndex;
  }

  set activeTabIndex(index) {
    this.tabsService.updateActiveTab(index);
  }

  get tabs() {
    return this.tabsService.openedTabs;
  }

  get activeTabId() {
    return this.tabsService.activeTabId;
  }

  get activeTabEntity() {
    return this.tabsService.openedTabs.find(
      (tab) => tab.id === this.activeTabId
    )?.entity;
  }

  public tabChange(index: number) {
    if (this.activeTabIndex !== index) {
      this.activeTabIndex = index;
    }
  }

  public tabClose(event: MouseEvent, id: string) {
    this.tabsService.removeTab(id);
    event.preventDefault();
    event.stopPropagation();
  }
}
