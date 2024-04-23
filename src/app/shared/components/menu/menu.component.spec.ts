import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TabsService } from '@services/tabs/tabs.service';
import { clickElement, selectElement } from '@testing/dom-testing-utils';
import { fakeRouter } from '@testing/fake-router';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { MenuComponent, NeosMenuItem } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let mockMenu: NeosMenuItem[];
  let element: HTMLElement;
  const mockCallback = jasmine.createSpy('callback');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent],
      providers: [TabsService, { provide: Router, useValue: fakeRouter }],
      imports: [
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        NoopAnimationsModule,
        MatDialogModule,
        RouterTestingModule,
        TranslateTestingModule.withTranslations({
          en: { wiki: 'STARGAZER Wiki' },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockMenu = [
      {
        labelTranslateKey: 'wiki',
        callback: mockCallback,
      },
      {
        label: 'Label text',
        callback: mockCallback,
      },
    ];
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;
    component.label = 'Menu';
    component.items = mockMenu;
  });

  afterEach(() => {
    mockCallback.calls.reset();
  });

  it('should create a basic menu', () => {
    fixture.detectChanges();

    const rootButton = selectElement(fixture, '#root-button');

    expect(component).toBeTruthy();
    expect(rootButton).toBeTruthy();
    expect(rootButton.innerText).toBe('Menu');
  });

  it('should be expandable when an item has children', () => {
    mockMenu[0].children = [{ label: 'Child node' }];
    fixture.detectChanges();

    clickElement(fixture, '#root-button');
    fixture.detectChanges();
    const expandableItem = selectElement(fixture, '#expandable-button');
    clickElement(fixture, '#expandable-button');
    fixture.detectChanges();
    const finalItem = selectElement(fixture, '#action-button');
    fixture.detectChanges();

    expect(component.isExpandable(mockMenu[0])).toBeTruthy();
    expect(expandableItem).toBeTruthy();
    expect(expandableItem.innerText).toEqual('STARGAZER Wiki');
    expect(finalItem.innerText).toEqual('Child node');
  });

  it('should do nothing if item callback is not defined', () => {
    mockMenu[0].callback = undefined;

    component.handleItemCallback(mockMenu[0]);

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('should execute action on final menu item', () => {
    fixture.detectChanges();

    clickElement(fixture, '#root-button');
    fixture.detectChanges();
    const finalItem = selectElement(fixture, '#action-button');
    clickElement(fixture, '#action-button');
    fixture.detectChanges();

    expect(finalItem).toBeTruthy();
    expect(finalItem.innerText).toEqual('STARGAZER Wiki');
    expect(mockCallback).toHaveBeenCalled();
  });
});
