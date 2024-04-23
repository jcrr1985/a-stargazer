import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { appRoutes } from '@constants/app-routes';
import { TabsService } from '@services/tabs/tabs.service';

@Injectable({
  providedIn: 'root',
})
export class OpenTabGuard implements CanActivateChild {
  constructor(
    private readonly tabsService: TabsService,
    private readonly router: Router
  ) {}

  canActivateChild(): boolean {
    if (this.tabsService.openedTabs.length !== 0) {
      return true;
    }

    this.router.navigate([appRoutes.HOME]);
    return false;
  }
}
