import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '@constants/app-routes';
import { TabDetail, TabsService } from '@services/tabs/tabs.service';
import { OpenTabGuard } from './open-tab.guard';

describe('OpenTabGuard', () => {
  let guard: OpenTabGuard;
  let tabsService: TabsService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpenTabGuard, TabsService],
      imports: [RouterTestingModule, MatDialogModule],
    });
    guard = TestBed.inject(OpenTabGuard);
    tabsService = TestBed.inject(TabsService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true when there are opened tabs', () => {
    spyOnProperty(tabsService, 'openedTabs', 'get').and.returnValue([
      {
        id: '1',
        component: jasmine.any,
        isEdited: false,
        label: 'testTab',
        tabRoute: ['testroute'],
      },
      {
        id: '2',
        component: jasmine.any,
        isEdited: false,
        label: 'testTab',
        tabRoute: ['testroute'],
      },
    ] as TabDetail[]);
    spyOn(router, 'navigate');

    const result = guard.canActivateChild();

    expect(result).toBeTruthy();
  });

  it('should return false and redirect to home if no tab is opened', () => {
    spyOnProperty(tabsService, 'openedTabs', 'get').and.returnValue([]);
    spyOn(router, 'navigate');

    const result = guard.canActivateChild();

    expect(result).toBeFalsy();
    expect(router.navigate).toHaveBeenCalledWith([appRoutes.HOME]);
  });
});
