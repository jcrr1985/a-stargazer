import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EntityType } from '@constants/entities';
import { TabsService } from '@services/tabs/tabs.service';
import { clickElement, selectElement } from '@testing/dom-testing-utils';
import { fakeRouter } from '@testing/fake-router';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { WelcomeComponent } from 'src/app/pages/welcome/welcome.component';
import { TabbedContainerComponent } from './tabbed-container.component';

describe('TabbedContainerComponent', () => {
  let component: TabbedContainerComponent;
  let fixture: ComponentFixture<TabbedContainerComponent>;
  let tabsService: TabsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabbedContainerComponent, WelcomeComponent],
      imports: [
        MatIconModule,
        MatTabsModule,
        NoopAnimationsModule,
        MatDialogModule,
        RouterTestingModule,
        TranslateTestingModule.withTranslations({
          en: {},
        }),
      ],
      providers: [TabsService, { provide: Router, useValue: fakeRouter }],
    }).compileComponents();
    tabsService = TestBed.inject(TabsService);
    tabsService.addTab('Tab1', WelcomeComponent, EntityType.EVENT);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabbedContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with children', () => {
    expect(component).toBeTruthy();
    expect(
      selectElement(fixture, '.mat-tab-links').childNodes.length
    ).toBeGreaterThan(0);
  });

  it('should close tab', () => {
    const serviceRemoveTabSpy = spyOn(tabsService, 'removeTab');

    clickElement(fixture, '[data-testid="close-button"]');
    fixture.detectChanges();

    expect(serviceRemoveTabSpy).toHaveBeenCalled();
  });

  it('should change tab', () => {
    tabsService.addTab('Tab2', WelcomeComponent, EntityType.EVENT);
    fixture.detectChanges();
    clickElement(fixture, '.mat-tab-link:not(.mat-tab-label-active)');
    fixture.detectChanges();

    expect(component.activeTabId).toEqual(tabsService.activeTabId);
  });

  it('should update tab on back button pressed', () => {
    const openedId = tabsService.openedTabs[0].id;
    const fakeEvent = {
      target: { location: { pathname: `/event/${openedId}` } },
    };

    component.onPopState(fakeEvent);

    expect(component.activeTabId).toEqual(tabsService.activeTabId);
  });
});
