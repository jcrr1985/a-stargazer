import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTreeModule } from '@angular/material/tree';
import { By } from '@angular/platform-browser';
import {
  clickElement,
  getInnerHTML,
  selectElement,
} from '@testing/dom-testing-utils';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { NeosTreeNode, TreeComponent } from './tree.component';

describe('TreeComponent', () => {
  let mockTreeData: NeosTreeNode[] = [];
  let component: TreeComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<TreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TreeComponent],
      imports: [
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatTreeModule,
        LoggerTestingModule,
        TranslateTestingModule.withTranslations({
          en: { secondPage: 'Page 2' },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockTreeData = [
      {
        name: 'Most recent used',
        children: [
          {
            name: 'Page 1',
            icon: 'foundation',
          },
          {
            nameTranslateKey: 'secondPage',
            icon: 'foundation',
          },
        ],
      },
    ];
    fixture = TestBed.createComponent(TreeComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;
    component.treeData = mockTreeData;
  });

  it('should render tree and show root node name', () => {
    fixture.detectChanges();
    const tree = fixture.debugElement.query(By.css('[data-testid="mat-tree"]'));
    const treeElement: HTMLElement = tree.nativeElement;

    expect(component).toBeTruthy();
    expect(tree).toBeTruthy();
    expect(treeElement.innerHTML).toContain(mockTreeData[0].name!);
  });

  it('should render expandable tree inside panel', () => {
    component.isPanelMode = true;

    fixture.detectChanges();
    const panelContainer = element.querySelector('.panel')?.innerHTML;

    expect(panelContainer).toBeTruthy();
    expect(panelContainer).toContain('mat-tree');
    expect(
      component.treeControl.isExpandable(component.treeControl.dataNodes[0])
    ).toBeTruthy();
  });

  it('should render controls', () => {
    component.showControls = true;

    fixture.detectChanges();
    const controlsContainer = getInnerHTML(fixture, '.controls');

    expect(controlsContainer).toBeTruthy();
  });

  it('should expand all', () => {
    component.showControls = true;
    const expandSpy = spyOn(
      component.treeControl,
      'expandAll'
    ).and.callThrough();

    fixture.detectChanges();
    clickElement(fixture, '[data-testid="expand"]');

    expect(expandSpy).toHaveBeenCalledOnceWith();
  });

  it('should collapse all', () => {
    component.showControls = true;
    const collapseSpy = spyOn(
      component.treeControl,
      'collapseAll'
    ).and.callThrough();

    fixture.detectChanges();
    clickElement(fixture, '[data-testid="collapse"]');

    expect(collapseSpy).toHaveBeenCalledOnceWith();
  });

  it('should execute leaf callback if defined', () => {
    const mockActionableNode = {
      name: 'Actionable node',
      icon: 'stadium',
      callback: jasmine.createSpy('callback'),
    };
    mockTreeData[0].children![0].children = [mockActionableNode];

    fixture.detectChanges();
    component.treeControl.expandAll();
    fixture.detectChanges();
    const actionableNodeButton = selectElement(
      fixture,
      '[data-testid="tree-leaf-button"]'
    );
    clickElement(fixture, '[data-testid="tree-leaf-button"]');

    fixture.detectChanges();

    expect(actionableNodeButton).toBeTruthy();
    expect(mockActionableNode.callback).toHaveBeenCalled();
  });
});
