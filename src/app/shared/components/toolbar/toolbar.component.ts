import { Component, EventEmitter, Output } from '@angular/core';
import { NeosMenuItem } from '@shared/components/menu/menu.component';
import { ToolbarMenuItemsService } from '@shared/components/toolbar/toolbar-menu-items.service';

export interface ToolbarMenuConfig {
  name?: string;
  translateKey?: string;
  elements: NeosMenuItem[];
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Output() onGearClick = new EventEmitter<void>();
  labeledMenus: ToolbarMenuConfig[] = [];
  iconMenus: ToolbarMenuConfig[] = [];

  constructor(
    private readonly toolbarMenuItemService: ToolbarMenuItemsService
  ) {
    this.labeledMenus = this.toolbarMenuItemService.getLabeledMenus();
    this.iconMenus = this.toolbarMenuItemService.getIconMenus();
  }
}
