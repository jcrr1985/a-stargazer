import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { DebugElement } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { EventSearchResultData } from '@models/models';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { of } from 'rxjs';
import { MaterialModule } from './material.module';
import {
  NoDataColumnName,
  PaginatorOptions,
  RowAction,
  RowActionEvent,
  RowMenuAction,
  RowMenuActionEvent,
  TableAction,
  TableActionEvent,
  TableOptions,
} from './models/models';
import { TableGeneratorComponent } from './table-generator.component';

describe('TableGeneratorComponent', () => {
  let component: TableGeneratorComponent<any>;
  let fixture: ComponentFixture<TableGeneratorComponent<any>>;

  let mockDataSource = [
    {
      notes: true,
      no: 1,
      periodBegin: [2021, 1, 1],
      periodEnd: [2021, 1, 1],
      description: 'event 1',
      eventType: 'type 1',
      city: 'city 1',
      status: 'status 1',
      deadline: [2021, 1, 1],
      category: 'category 1',
      subCategory: 'sub-category 1',
      office: 'office 1',
      quoteId: 'quote id 1',
      isPMO: true,
      id: 1,
      isParent: false,
      contract: 'a',
      salesDeal: 'NEWS-LN',
    },
  ];
  const mockMatMenuTrigger = jasmine.createSpyObj<MatMenuTrigger>(
    'MatMenuTrigger',
    ['openMenu', 'closeMenu']
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableGeneratorComponent],
      providers: [
        FormBuilder,
        DatePipe,
        { provide: MatMenuTrigger, useValue: mockMatMenuTrigger },
      ],
      imports: [
        MatPaginatorModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        MatListModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        MatListModule,
        NoopAnimationsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        TranslateTestingModule.withTranslations({
          en: {
            filter: 'filter',
          },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableGeneratorComponent);

    component = fixture.componentInstance;
    component.data = mockDataSource;
    component.allColumns = [
      'notes',
      'no',
      'periodBegin',
      NoDataColumnName.columnsSelector,
    ];

    component.columnsConfiguration = {
      notes: {
        translateKey: 'notes',
        type: 'tooltip',
        searchMethod: (_: EventSearchResultData) => of('Mock tooltip data'),
      },
      no: {
        translateKey: 'eventNo',
        type: 'number',
        width: '100px',
      },

      periodBegin: {
        translateKey: 'startDate',
        type: 'date',
        format: 'dd/MM/yyyy',
      },
    };
    component.rowsSelected = ['test'];
    component.currentRowsSelected = new SelectionModel<any>(true, []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create without paginator', () => {
    component.paginatorOptions = { show: false };

    component.ngAfterViewInit();
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should filter the data source', () => {
    const currentDataSource = new MatTableDataSource([
      { name: 'John', age: 25 },
      { name: 'Jane', age: 30 },
      { name: 'Bob', age: 35 },
    ]);
    component.currentDataSource = currentDataSource;
    component.filterValue = 'Jane';

    component.applyFilter();

    expect(component.currentDataSource.filteredData.length).toBe(1);
    expect(component.currentDataSource.filteredData[0].name).toBe('Jane');
  });

  it('should set currentPaginatorOptions', () => {
    const customPaginatorOptions = {
      show: false,
      pageSizeOptions: [5, 10, 20],
      pageSize: 10,
      pageIndex: 1,
      showFirstLastButtons: false,
    };

    component.paginatorOptions = customPaginatorOptions;

    expect(component.currentPaginatorOptions).toEqual({
      show: false,
      pageSizeOptions: [5, 10, 20],
      pageSize: 10,
      pageIndex: 1,
      showFirstLastButtons: false,
    });
  });

  it('should emit pageChange event', () => {
    const pageEvent: PageEvent = { pageIndex: 1, pageSize: 10, length: 100 };
    spyOn(component.pageChange, 'emit');
    component.onPageChange(pageEvent);
    expect(component.pageChange.emit).toHaveBeenCalledWith(pageEvent);
  });

  it('should set tableOptions correctly', () => {
    const tableOptions: Partial<TableOptions> = {
      showHeaderWhenContentNoData: false,
      showResult: false,
    };

    component.tableOptions = tableOptions;

    expect(component.currentTableOptions).toEqual({
      showHeaderWhenContentNoData: false,
      showMenuActions: true,
      showFilter: true,
      showResult: false,
      markRowSelected: true,
      showRowsSelector: true,
      multipleRowsSelected: true,
      showColumnsSelector: true,
      showTableActions: true,
      showRowActions: true,
    });
  });

  it('should set single row selection', () => {
    const tableOptions: Partial<TableOptions> = {
      showHeaderWhenContentNoData: false,
      showResult: false,
      multipleRowsSelected: false,
    };

    component.tableOptions = tableOptions;

    expect(component.currentTableOptions).toEqual({
      showHeaderWhenContentNoData: false,
      showMenuActions: true,
      showFilter: true,
      showResult: false,
      markRowSelected: true,
      showRowsSelector: true,
      multipleRowsSelected: false,
      showColumnsSelector: true,
      showTableActions: true,
      showRowActions: true,
    });
    expect(component.currentRowsSelected.isMultipleSelection()).toBeFalse();
  });

  it('should call paginator.firstPage() when applying filter', () => {
    const paginatorSpy = spyOn(
      component.currentDataSource.paginator!,
      'firstPage'
    );
    component.filterValue = 'example';
    fixture.detectChanges();
    component.applyFilter();
    expect(paginatorSpy).toHaveBeenCalled();
  });

  it('should return an empty array when no columns', () => {
    const result = component.getDataColumnNames();
    expect(result).toEqual([]);
  });

  it('should return an empty array when input is null', () => {
    const result = component.getDataColumnNames([]);
    expect(result).toEqual([]);
  });

  it('should return the input array when it is not null', () => {
    const columns: string[] = ['column1', 'column2', 'column3'];
    const result = component.getDataColumnNames([
      'column1',
      'column2',
      'column3',
    ]);
    expect(result).toEqual(columns);
  });

  it('should initialize currentRowsSelected with the provided values', () => {
    const values: any[] = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];
    component.rowsSelected = values;
    expect(component.currentRowsSelected.selected).toEqual(values);
  });

  it('should emit the rowsSelectedChange event when onRowSelectedChange is called', () => {
    const emitSpy = spyOn(component.rowsSelectedChange, 'emit');
    const row = { id: 1, name: 'Row 1' };
    component.onRowSelectedChange(row);
    expect(emitSpy).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalledWith([{ id: 1, name: 'Row 1' }]);
  });

  it('should return false if not all rows are selected', () => {
    component.currentDataSource.data = [
      { id: 1, name: 'Row 1' },
      { id: 2, name: 'Row 2' },
      { id: 3, name: 'Row 3' },
    ];
    component.currentRowsSelected.select([component.currentDataSource.data[0]]);
    const result = component.isAllSelected();
    expect(result).toBe(false);
  });

  it('should clear selection if all rows are selected', () => {
    component.currentDataSource.data = [
      { id: 1, name: 'Row 1' },
      { id: 2, name: 'Row 2' },
      { id: 3, name: 'Row 3' },
    ];
    component.currentRowsSelected.select(...component.currentDataSource.data);
    component.masterToggle();
    expect(component.currentRowsSelected.selected.length).toBe(0);
  });

  it('should select all rows if none are selected', () => {
    component.currentDataSource.data = [
      { id: 1, name: 'Row 1' },
      { id: 2, name: 'Row 2' },
      { id: 3, name: 'Row 3' },
    ];
    component.masterToggle();
    expect(component.currentRowsSelected.selected.length).toBe(
      component.currentDataSource.data.length
    );
  });

  it('should set menu position and open menu', () => {
    const event = new MouseEvent('click', {
      clientX: 100,
      clientY: 200,
    });
    component.showColumnsMenuClick(event);
    expect(component.columnsSelectorMenuPosition.x).toBe('100px');
    expect(component.columnsSelectorMenuPosition.y).toBe('200px');
    expect(component.columnsSelectorMenu.menuData.columns).toEqual(
      component.allColumns
    );
    expect(component.columnsSelectorMenu.menuOpen).toBe(true);
  });

  it('should update displayed columns based on selected columns', () => {
    component.allColumns = [
      'notes',
      'periodBegin',
      NoDataColumnName.columnsSelector,
    ];
    component.currentDisplayedColumns = [
      'notes',
      NoDataColumnName.columnsSelector,
    ];
    component.columnsSelectorMenuChange(['notes', 'periodBegin']);
    expect(component.currentDisplayedColumns).toEqual([
      'notes',
      'periodBegin',
      NoDataColumnName.columnsSelector,
    ]);
  });

  it('should set currentRowMenuActions', () => {
    const rowMenuActions: RowMenuAction<any>[] = [
      {
        id: '1',
        translateKey: 'action1',
      },
      {
        id: '2',
        translateKey: 'action2',
      },
    ];

    component.rowMenuActions = rowMenuActions;

    expect(component.currentRowMenuActions).toEqual(rowMenuActions);
  });

  it('Should return empty array if does not receives columns in string array', () => {
    const returnedValue = component.getDataColumnNames([]);
    expect(returnedValue).toEqual([]);
  });

  it('should not prevent default context menu when hasContextMenu is false', () => {
    component.hasContextMenu = false;
    const event = new MouseEvent('contextmenu');
    fixture.detectChanges();
    component.contextMenuIn(event);
    expect(event.defaultPrevented).toBe(false);
  });

  it('should emit rowMenuAction event with correct parameters', () => {
    const row: any = { id: 1, name: 'notes' };
    const rowMenuAction: RowMenuAction<any> = {
      id: '1',
      translateKey: 'notes',
    };
    const event = {} as Event;
    let emittedEvent: RowMenuActionEvent<any> | undefined;
    component.rowMenuAction.subscribe((event) => {
      emittedEvent = event;
    });
    component.onRowMenuAction(row, rowMenuAction, event);
    expect(emittedEvent).toBeTruthy();
    expect(emittedEvent?.row).toBe(row);
    expect(emittedEvent?.action).toBe(rowMenuAction);
    expect(emittedEvent?.event).toBe(event);
  });

  it('should open context menu with correct position and data', () => {
    const row: any = { id: 1, name: 'notes' };
    const event = new MouseEvent('contextmenu', {
      clientX: 100,
      clientY: 200,
    });

    const mockContextMenu = {
      menuData: null as any,
      menu: {
        focusFirstItem: jasmine.createSpy('focusFirstItem'),
      },
      openMenu: jasmine.createSpy('openMenu'),
    };

    spyOn(component.contextMenu, 'openMenu').and.callFake(() => {
      mockContextMenu.menuData = component.contextMenu.menuData;
      mockContextMenu.menu.focusFirstItem('mouse');
    });
    component.onContextMenu(row, event);
    expect(mockContextMenu.menuData).toEqual({ row });
    expect(mockContextMenu.menu.focusFirstItem).toHaveBeenCalledWith('mouse');
  });

  it('should prevent default context menu when hasContextMenu is true', () => {
    component.hasContextMenu = true;
    const event = new MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true,
      button: 2,
    });

    document.dispatchEvent(event);
    component.contextMenuIn(event);
    fixture.detectChanges();
    expect(event.defaultPrevented).toBe(true);
  });

  it('should not prevent default context menu when hasContextMenu is false', () => {
    component.hasContextMenu = false;
    fixture.detectChanges();
    const event = new MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true,
      button: 2,
    });
    document.dispatchEvent(event);
    component.contextMenuIn(event);
    fixture.detectChanges();
    expect(event.defaultPrevented).toBe(false);
  });

  it('should set currentTableActions', () => {
    const tableActions: TableAction[] = [
      {
        id: '1',
        translateKey: 'create',
        icon: 'create',
      },
    ];

    component.tableActions = tableActions;

    expect(component.currentTableActions).toEqual(tableActions);
  });

  it('should emit tableAction event with correct parameters', () => {
    const row: any = { id: 1, name: 'notes' };

    const tableAction: TableAction = {
      id: 'notes',
      translateKey: 'notes',
      icon: 'close',
    };
    const event = {} as Event;
    let emittedEvent: TableActionEvent | undefined;

    component.tableActionEvent.subscribe((event) => {
      emittedEvent = event;
    });

    component.onTableAction(tableAction, event);
    expect(emittedEvent).toBeTruthy();
    expect(emittedEvent?.action).toBe(tableAction);
    expect(emittedEvent?.event).toBe(event);
  });

  it('should set currentRowActions', () => {
    const rowActions: RowAction<any>[] = [
      {
        id: 'edit',
        translateKey: 'edit',
        icon: 'edit',
      },
    ];

    component.rowActions = rowActions;

    expect(component.currentRowActions).toEqual(rowActions);
  });

  it('should emit rowAction event with correct parameters', () => {
    const row: any = { id: 1, name: 'notes' };

    const rowAction: RowAction<any> = {
      id: 'notes',
      translateKey: 'notes',
      icon: 'close',
    };
    const event = {} as Event;
    let emittedEvent: RowActionEvent<any> | undefined;

    component.rowActionEvent.subscribe((event) => {
      emittedEvent = event;
    });

    component.onRowAction(row, rowAction, event);
    expect(emittedEvent).toBeTruthy();
    expect(emittedEvent?.row).toBe(row);
    expect(emittedEvent?.action).toBe(rowAction);
    expect(emittedEvent?.event).toBe(event);
  });

  it('should emit rowClick event', fakeAsync(() => {
    const spy = spyOn(component.rowClick, 'emit');
    const selectedChange = spyOn(component, 'onRowSelectedChange');

    const row = { id: 'id' };
    const event = {} as Event;

    component['noRowClick'] = false;
    component.rowClickDelay = 200;
    component.onRowClick(row, event);

    tick(300);
    fixture.detectChanges();

    expect(selectedChange).toHaveBeenCalledWith(row);
    expect(spy).toHaveBeenCalledWith({ row, event });
  }));

  it('should emit rowClick event', fakeAsync(() => {
    const spy = spyOn(component.rowClick, 'emit');
    const selectedChange = spyOn(component, 'onRowSelectedChange');

    const row = { id: 'id' };
    const event = {} as Event;

    component['noRowClick'] = false;
    component.rowClickDelay = 200;
    component.onRowClick(row, event);

    tick(300);
    fixture.detectChanges();

    expect(selectedChange).toHaveBeenCalledWith(row);
    expect(spy).toHaveBeenCalledWith({ row, event });
  }));

  it('should NO emit rowClick event', fakeAsync(() => {
    const spy = spyOn(component.rowClick, 'emit');
    const selectedChange = spyOn(component, 'onRowSelectedChange');

    const row = { id: 'id' };
    const event = {} as Event;

    component['noRowClick'] = true;
    component.rowClickDelay = 200;
    component.onRowClick(row, event);

    tick(300);
    fixture.detectChanges();

    expect(selectedChange).not.toHaveBeenCalled();
    expect(spy).not.toHaveBeenCalled();
  }));

  it('should emit rowDblClick event', () => {
    const spy = spyOn(component.rowDblClick, 'emit');

    const row = { id: 'id' };
    const event = {} as Event;

    component.onRowDblClick(row, event);

    expect(spy).toHaveBeenCalledWith({ row, event });
  });

  it('should set currentDataSource.paginator to this.paginator', () => {
    const customPaginatorOptions: Partial<PaginatorOptions> = {
      show: true,
    };

    component.paginatorOptions = customPaginatorOptions;
    fixture.detectChanges();

    expect(component.currentDataSource.paginator).toBe(component.paginator);
  });

  it('should set currentDataSource.paginator to null', () => {
    const customPaginatorOptions: Partial<PaginatorOptions> = {
      show: false,
    };

    component.paginatorOptions = customPaginatorOptions;
    fixture.detectChanges();

    expect(component.currentDataSource.paginator).toBeNull();
  });

  it('should fetch and set tooltipData', () => {
    const matIconDebugElement: DebugElement = fixture.debugElement.query(
      By.css('#tooltip-button')
    );
    const matIconElement: HTMLElement = matIconDebugElement.nativeElement;
    const mockMouseEvent = new MouseEvent('click', {
      clientX: 100,
      clientY: 200,
    });
    matIconElement.dispatchEvent(mockMouseEvent);

    expect(component.tooltipData).toBe('Mock tooltip data');
    expect(component.tooltipMenuPosition.x).toBe('100px');
    expect(component.tooltipTrigger.menuOpen).toBeTrue();
  });
});
