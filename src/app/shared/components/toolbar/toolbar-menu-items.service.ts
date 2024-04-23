import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TabsService } from '@services/tabs/tabs.service';
import { aboutMenu } from './config/aboutMenu';
import { getAddMenu } from './config/addMenu';
import { getSearchMenu } from './config/searchMenu';
import { getToolsMenu } from './config/toolsMenu';
import { ToolbarMenuConfig } from './toolbar.component';

export enum LabeledToolbarItem {
  Tools = 'tools',
  About = 'about',
}

export enum IconToolbarItem {
  Search = 'search',
  Add = 'add',
}

@Injectable({ providedIn: 'root' })
export class ToolbarMenuItemsService {
  constructor(
    private readonly tabsService: TabsService,
    private readonly dialog: MatDialog
  ) {}

  labeledMenus = new Map([
    [LabeledToolbarItem.Tools, getToolsMenu(this.tabsService, this.dialog)],
    [LabeledToolbarItem.About, aboutMenu],
  ]);

  iconMenus = new Map([
    [IconToolbarItem.Search, getSearchMenu(this.tabsService)],
    [IconToolbarItem.Add, getAddMenu(this.tabsService)],
  ]);

  getLabeledMenus(): ToolbarMenuConfig[] {
    const menuKeys = [...this.labeledMenus.keys()];
    return menuKeys.map((menuKey) => ({
      translateKey: menuKey.toString(),
      elements: this.labeledMenus.get(menuKey) || [],
    }));
  }

  getIconMenus(): ToolbarMenuConfig[] {
    const menuKeys = [...this.iconMenus.keys()];
    return menuKeys.map((menuKey) => ({
      name: menuKey.toString(),
      elements: this.iconMenus.get(menuKey) || [],
    }));
  }
}
