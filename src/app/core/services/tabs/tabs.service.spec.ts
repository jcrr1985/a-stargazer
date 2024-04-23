import { TestBed, waitForAsync } from '@angular/core/testing';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EVENT_PROPERTIES, EntityType } from '@constants/entities';
import { NavigationHistoryService } from '@services/navigation-history/navigation-history.service';
import { fakeRouter } from '@testing/fake-router';
import { of } from 'rxjs';
import { WelcomeComponent } from 'src/app/pages/welcome/welcome.component';
import { TabDetail, TabsService } from './tabs.service';

describe('TabsService', () => {
  let navigationHistoryService: NavigationHistoryService;
  let dialogService: MatDialog;
  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of({}),
    close: true,
  });
  dialogRefSpyObj.componentInstance = { body: '' };

  let service: TabsService;
  let testLabel: string;
  let testComponent = WelcomeComponent;
  let testEntity: EntityType;

  beforeEach(() => {
    testLabel = 'TestTab';
    testEntity = EntityType.EVENT;
    TestBed.configureTestingModule({
      imports: [MatDialogModule, RouterTestingModule],
      providers: [
        NavigationHistoryService,
        { provide: Router, useValue: fakeRouter },
      ],
    });
    dialogService = TestBed.inject(MatDialog);
    navigationHistoryService = TestBed.inject(NavigationHistoryService);
    service = TestBed.inject(TabsService);
  });

  it('should be created without opened tabs', () => {
    expect(service).toBeTruthy();
    expect(service.openedTabs.length).toBe(0);
    expect(service.activeTabId).toBeFalsy();
  });

  it('should add tab and set it as active', waitForAsync(() => {
    const expectedTabDetail = {
      id: jasmine.any(String),
      component: testComponent,
      contextData: undefined,
      isEdited: false,
      label: testLabel,
      tabRoute: [testEntity, jasmine.any(String)],
      icon: EVENT_PROPERTIES.icon,
      entity: testEntity,
      color: EVENT_PROPERTIES.color,
    };

    service.addTab(testLabel, testComponent, testEntity);

    expect(service.openedTabs.length).toBe(1);
    expect(service.getActiveTabData()).toEqual(expectedTabDetail);
    expect(service.activeTabId).toBeTruthy();
  }));

  it('should add multiple tabs with the same input and focus the last', () => {
    service.addTab(testLabel, testComponent, testEntity);
    service.addTab(testLabel, testComponent, testEntity);

    expect(service.openedTabs.length).toBe(2);
    expect(service.openedTabs[0].id).not.toBe(service.activeTabId);
  });

  it('should update and return active tab id correctly', () => {
    service.addTab(testLabel, testComponent, testEntity);
    service.addTab(testLabel, testComponent, testEntity);
    service.activeTabIndex = 0;
    service.activeTabId = service.openedTabs[0].id;

    expect(service.activeTabId).toBe(service.openedTabs[0].id);
    expect(service.activeTabIndex).toBe(0);
  });

  it('should not change index if it is invalid', () => {
    service.activeTabIndex = 5;

    expect(service.activeTabIndex).toBe(0);
  });

  it('should add unique tab and set it as default', () => {
    const expectedTabDetail: TabDetail = {
      id: testLabel,
      component: testComponent,
      contextData: undefined,
      isEdited: false,
      label: testLabel,
      tabRoute: [testLabel],
      icon: EVENT_PROPERTIES.icon,
      entity: testEntity,
      color: EVENT_PROPERTIES.color,
    };

    service.addUniqueTab(testLabel, testComponent, testEntity);

    expect(service.openedTabs.length).toBe(1);
    expect(service.openedTabs[0]).toEqual(expectedTabDetail);
    expect(service.activeTabId).toEqual(testLabel);
  });

  it('should add unique tab once', () => {
    service.addUniqueTab(testLabel, testComponent, testEntity);
    service.addUniqueTab(testLabel, testComponent, testEntity);

    expect(service.openedTabs.length).toBe(1);
  });

  it('should remove tab', () => {
    dialogSpy = spyOn(dialogService, 'open').and.returnValue(dialogRefSpyObj);
    service.addTab(testLabel, testComponent, testEntity);
    service.removeTab(service.openedTabs[0].id);

    expect(service.openedTabs.length).toBe(0);
    expect(service.activeTabId).toBeFalsy();
  });

  it('should not remove tab if user not accepted dialog', () => {
    dialogRefSpyObj = jasmine.createSpyObj({
      afterClosed: of(false),
      close: false,
    });
    dialogSpy = spyOn(dialogService, 'open').and.returnValue(dialogRefSpyObj);

    service.addTab(testLabel, testComponent, testEntity);
    service.setTabEditing(service.activeTabId, true);
    service.removeTab(service.openedTabs[0].id);

    expect(service.openedTabs.length).toBe(1);
    expect(service.activeTabId).toBeTruthy();
  });

  it('should not remove if tab is not active', () => {
    dialogSpy = spyOn(dialogService, 'open').and.returnValue(dialogRefSpyObj);
    service.addTab(testLabel, testComponent, testEntity);
    service.addTab(testLabel, testComponent, testEntity);
    service.removeTab(service.openedTabs[0].id);

    expect(service.openedTabs.length).toBe(2);
  });

  it('should not remove if id is not a valid tab id', () => {
    dialogSpy = spyOn(dialogService, 'open').and.returnValue(dialogRefSpyObj);
    service.addTab(testLabel, testComponent, testEntity);
    service.addTab(testLabel, testComponent, testEntity);
    service.removeTab('Invalid');

    expect(service.openedTabs.length).toBe(2);
  });

  it('should show confirmation dialog if has pending changes', () => {
    dialogSpy = spyOn(dialogService, 'open').and.returnValue(dialogRefSpyObj);
    service.addTab(testLabel, testComponent, testEntity);
    service.setTabEditing(service.activeTabId, true);

    service.removeTab(service.activeTabId);

    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should mark as active right tab after remove if multiple tabs exists', () => {
    dialogSpy = spyOn(dialogService, 'open').and.returnValue(dialogRefSpyObj);
    service.addTab(testLabel, testComponent, testEntity);
    service.addTab(testLabel, testComponent, testEntity);
    service.addTab(testLabel, testComponent, testEntity);
    service.activeTabId = service.openedTabs[1].id;
    service.removeTab(service.openedTabs[1].id);

    expect(service.openedTabs.length).toBe(2);
    expect(service.activeTabId).toBe(service.openedTabs[1].id);
  });

  it('should mark as active left tab after remove if closing last one', () => {
    dialogSpy = spyOn(dialogService, 'open').and.returnValue(dialogRefSpyObj);
    service.addTab(testLabel, testComponent, testEntity);
    service.addTab(testLabel, testComponent, testEntity);
    service.addTab(testLabel, testComponent, testEntity);
    service.removeTab(service.openedTabs[2].id);

    expect(service.openedTabs.length).toBe(2);
    expect(service.activeTabId).toBe(service.openedTabs[1].id);
  });

  it('should allow to mark as editing', () => {
    service.addTab(testLabel, testComponent, testEntity);
    service.setTabEditing(service.openedTabs[0].id, true);

    expect(service.openedTabs[0].isEdited).toBeTruthy();
  });

  it('should allow to set tab context', () => {
    const mockContextData = {
      description: 'Some description',
    };

    service.addTab(testLabel, testComponent, testEntity);
    service.setActiveTabContext(mockContextData);

    expect(service.getActiveTabData().contextData).toEqual(mockContextData);
  });

  it('should allow to update tab context', () => {
    const mockContextData = {
      description: 'Some description',
    };
    const objectToMerge = { name: 'Name' };

    service.addTab(testLabel, testComponent, testEntity);
    service.setActiveTabContext(mockContextData);
    service.patchActiveTabContext(objectToMerge);

    expect(service.getActiveTabData().contextData.description).toEqual(
      mockContextData.description
    );
    expect(service.getActiveTabData().contextData.name).toEqual(
      objectToMerge.name
    );
  });

  it('should add a new tab if history service emits a navigation request', waitForAsync(() => {
    const addUniqueTabSpy = spyOn(service, 'addUniqueTab');
    const fakeTabDetail: TabDetail = {
      id: testLabel,
      component: testComponent,
      contextData: undefined,
      isEdited: false,
      label: testLabel,
      tabRoute: [testLabel],
      icon: EVENT_PROPERTIES.icon,
      entity: testEntity,
      color: EVENT_PROPERTIES.color,
    };
    navigationHistoryService['_navigationRequestSource'].next({
      displayLabel: 'test',
      entity: testEntity,
      tabDetails: fakeTabDetail,
    });

    expect(addUniqueTabSpy).toHaveBeenCalledWith(
      fakeTabDetail.id,
      fakeTabDetail.component,
      fakeTabDetail.entity!,
      fakeTabDetail.contextData,
      fakeTabDetail.tabRoute
    );
  }));
});
