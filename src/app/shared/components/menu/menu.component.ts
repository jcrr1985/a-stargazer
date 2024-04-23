import { Component, Input } from '@angular/core';
import { TabsService } from '@services/tabs/tabs.service';

export interface NeosMenuItem {
  icon?: string;
  iconColor?: string;
  label?: string;
  labelTranslateKey?: string;
  callback?: Function;
  children?: NeosMenuItem[];
}

const DIVIDER_IDENTIFIER = 'divider';
export const MenuDivider: NeosMenuItem = { label: DIVIDER_IDENTIFIER };

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  constructor(private tabsService: TabsService) {}
  @Input() items: NeosMenuItem[] = [];
  @Input() isRootItem = true;
  @Input() isIconMode = false;
  @Input() label?: string;
  @Input() labelTranslateKey?: string;

  isExpandable(item: NeosMenuItem) {
    return item.children && item.children.length > 0;
  }

  isDivider(item: NeosMenuItem) {
    return item.label === DIVIDER_IDENTIFIER;
  }

  handleItemCallback(item: NeosMenuItem) {
    if (!item.callback) {
      return;
    }

    item.callback(this.tabsService, item.label);
  }
}
