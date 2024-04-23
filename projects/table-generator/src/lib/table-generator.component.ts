import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  MAT_MENU_DEFAULT_OPTIONS,
  MatMenuTrigger,
} from '@angular/material/menu';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  ColumnsConfiguration,
  CommonConfiguartion,
  DataColumnName,
  NoDataColumnName,
  PaginatorOptions,
  RowAction,
  RowActionEvent,
  RowEvent,
  RowMenuAction,
  RowMenuActionEvent,
  TableAction,
  TableActionEvent,
  TableOptions,
  TooltipConfiguration,
  tooltipMenuPosition,
} from './models/models';

const DEFAULT_PAGINATOR_OPTIONS: PaginatorOptions = {
  show: true,
  pageSizeOptions: [10, 20, 50, 100],
  pageSize: 10,
  pageIndex: 0,
  showFirstLastButtons: true,
};

const DEFAULT_TABLE_OPTIONS: TableOptions = {
  showHeaderWhenContentNoData: true,
  showMenuActions: true,
  showFilter: true,
  showResult: true,
  markRowSelected: true,
  showRowsSelector: true,
  multipleRowsSelected: true,
  showColumnsSelector: true,
  showTableActions: true,
  showRowActions: true,
};

const DEFAULT_ROW_CLICK_DELAY = 200;

@Component({
  selector: 'talan-table-generator',
  templateUrl: 'table-generator.component.html',
  styleUrls: ['table-generator.component.scss'],
  providers: [
    {
      provide: MAT_MENU_DEFAULT_OPTIONS,
      useValue: {
        // `overlayPanelClass` not working for individual mat-menu (bug Angular 11)
        overlayPanelClass: 'table-generator-menu-overlay-panel',
      },
    },
  ],
})
export class TableGeneratorComponent<T> implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit(): void {
    this.initCurrentDisplayedColumns();
    this.initColumnsSelected();
  }

  // Paginator & sort
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.currentDataSource.sort = this.sort;

    if (this.currentPaginatorOptions.show) {
      this.currentDataSource.paginator = this.paginator;
    }
  }

  currentPaginatorOptions: PaginatorOptions = DEFAULT_PAGINATOR_OPTIONS;
  @Input() set paginatorOptions(value: Partial<PaginatorOptions>) {
    this.currentPaginatorOptions = { ...DEFAULT_PAGINATOR_OPTIONS, ...value };

    if (this.currentPaginatorOptions.show) {
      this.currentDataSource.paginator = this.paginator;
    } else {
      this.currentDataSource.paginator = null;
    }
  }

  @Output() pageChange = new EventEmitter<PageEvent>();

  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }

  @Input() columnsConfiguration: ColumnsConfiguration = {};

  // Table Options
  currentTableOptions = DEFAULT_TABLE_OPTIONS;

  @Input() set tableOptions(value: Partial<TableOptions>) {
    this.currentTableOptions = { ...DEFAULT_TABLE_OPTIONS, ...value };

    // Next code solves setter dependency of tableOptions with rowsSelected
    if (value.hasOwnProperty('multipleRowsSelected')) {
      this.currentRowsSelected = new SelectionModel(
        value.multipleRowsSelected,
        this.currentRowsSelected.selected
      );
    }
  }

  // Table DataSource
  currentDataSource = new MatTableDataSource<T>();

  /**
   * Set Table DataSource & filter by input filter
   */
  @Input() set data(value: T[]) {
    this.currentDataSource.data = value;
    this.currentDataSource.sort = this.sort;
    this.applyFilter();
  }

  // Table filter behaviour
  @Input() filterValue = '';

  tooltipData!: string;

  applyFilter(): void {
    this.currentDataSource.filter = this.filterValue.trim().toLowerCase();

    if (this.currentDataSource.paginator) {
      this.currentDataSource.paginator.firstPage();
    }
  }

  /**
   * Displayed columns
   */
  currentDisplayedColumns: string[] = [];

  @Input() allColumns!: string[];

  initCurrentDisplayedColumns() {
    this.currentDisplayedColumns = this.allColumns;
  }

  NoDataColumnName = NoDataColumnName;

  // TODO: Provider in module this property
  noDataColumnNames: NoDataColumnName[] = [
    NoDataColumnName.columnsSelector,
    NoDataColumnName.rowsSelector,
  ];

  getDataColumnNames(columns?: string[]) {
    if (!columns) {
      return [];
    }

    return columns.filter(
      (column) => !(this.noDataColumnNames as DataColumnName[]).includes(column)
    );
  }

  // RowsSelector
  @Output() rowsSelectedChange = new EventEmitter<T[]>();
  @Input() set rowsSelected(values: T[]) {
    this.currentRowsSelected = new SelectionModel<T>(
      this.currentTableOptions.multipleRowsSelected,
      values
    );
  }
  currentRowsSelected = new SelectionModel<T>(
    this.currentTableOptions.multipleRowsSelected,
    []
  );

  onRowSelectedChange(row: T) {
    this.currentRowsSelected.toggle(row);
    this.rowsSelectedChange.emit(this.currentRowsSelected.selected);
  }

  isAllSelected() {
    const numSelected = this.currentRowsSelected.selected.length;
    const numRows = this.currentDataSource.data.length;

    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.currentRowsSelected.clear()
      : this.currentDataSource.data.forEach((row) =>
          this.currentRowsSelected.select(row)
        );
  }

  // ColumnsSelector
  /**
   * show menu
   */
  columnsSelectorIcon: 'expand_less' | 'expand_more' = 'expand_more';

  /**
   * The calculate columnsMenu position
   */
  columnsSelectorMenuPosition = { x: '0px', y: '0px' };

  @ViewChild('columnsSelectorMenuTrigger', { read: MatMenuTrigger })
  columnsSelectorMenu!: MatMenuTrigger;

  showColumnsMenuClick(event: MouseEvent) {
    this.columnsSelectorMenuPosition.x = event.clientX + 'px';
    this.columnsSelectorMenuPosition.y = event.clientY + 'px';

    this.columnsSelectorMenu.menuData = {
      columns: this.allColumns,
    };
    this.columnsSelectorMenu.menu.focusFirstItem('mouse');
    this.columnsSelectorMenu.openMenu();
  }

  /**
   * columns selected model
   */
  columnsSelected: string[] = [];
  isColumnSelected(column: string) {
    return this.columnsSelected.includes(column);
  }
  initColumnsSelected() {
    this.columnsSelected = this.getDataColumnNames(this.allColumns);
  }

  columnsSelectorMenuChange(selectedColumns: string[]) {
    const displayedColumns = selectedColumns.concat(this.noDataColumnNames);

    // Respects `allColumns` columns order
    this.currentDisplayedColumns = this.allColumns.filter((column) => {
      return displayedColumns.includes(column);
    });
  }

  // Menu per row
  @ViewChild('contextMenuTrigger', { read: MatMenuTrigger })
  contextMenu!: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  onContextMenu(row: T, event: MouseEvent) {
    event.preventDefault();

    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';

    this.contextMenu.menuData = { row };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  // Actions per menu row
  @Input() set rowMenuActions(value: RowMenuAction<T>[]) {
    this.currentRowMenuActions = value;
  }
  currentRowMenuActions: RowMenuAction<T>[] = [];

  @Output() rowMenuAction = new EventEmitter<RowMenuActionEvent<T>>();
  onRowMenuAction(row: T, action: RowMenuAction<T>, event: Event) {
    this.rowMenuAction.emit({ row, action, event });
  }

  // Prevents default contextmenu when action menu is showing
  hasContextMenu = false;
  @HostListener('document:contextmenu', ['$event'])
  contextMenuIn(event: MouseEvent) {
    if (this.hasContextMenu) {
      event.preventDefault();
    }
  }

  // Table Actions
  @Input() set tableActions(value: TableAction[]) {
    this.currentTableActions = value;
  }
  currentTableActions: TableAction[] = [];

  @Output() tableActionEvent = new EventEmitter<TableActionEvent>();
  onTableAction(action: TableAction, event: Event) {
    this.tableActionEvent.emit({ action, event });
  }

  // Row Actions
  @Input() set rowActions(value: RowAction<T>[]) {
    this.currentRowActions = value;
  }
  currentRowActions: RowAction<T>[] = [];

  @Output() rowActionEvent = new EventEmitter<RowActionEvent<T>>();
  onRowAction(row: T, action: RowAction<T>, event: Event) {
    this.rowActionEvent.emit({ row, action, event });
  }

  // Row click & double click
  @Input() rowClickDelay = DEFAULT_ROW_CLICK_DELAY;
  private noRowClick = false;
  private timer!: ReturnType<typeof setTimeout>;

  @Output() rowClick = new EventEmitter<RowEvent<T>>();
  onRowClick(row: T, event: Event) {
    this.timer = setTimeout(() => {
      if (!this.noRowClick) {
        this.onRowSelectedChange(row);
        this.rowClick.emit({ row, event });
      }

      this.noRowClick = false;
    }, this.rowClickDelay);
  }

  @Output() rowDblClick = new EventEmitter<RowEvent<T>>();
  onRowDblClick(row: T, event: Event) {
    this.noRowClick = true;
    clearTimeout(this.timer);

    this.rowDblClick.emit({ row, event });
  }

  @ViewChild('tooltipTrigger', { read: MatMenuTrigger })
  tooltipTrigger!: MatMenuTrigger;
  tooltipMenuPosition: tooltipMenuPosition = { x: '0px', y: '0px' };

  // Feching data in a tooltip cell
  tooltipFetchAsyncData(
    row: T,
    columnConfigurationObject: CommonConfiguartion & TooltipConfiguration,
    event: MouseEvent
  ) {
    event.stopPropagation();
    columnConfigurationObject
      .searchMethod(row)
      .subscribe((tooltipData: string) => {
        this.tooltipData = tooltipData;

        this.tooltipMenuPosition.x = event.clientX + 'px';
        this.tooltipMenuPosition.y = event.clientY + 'px';

        this.tooltipTrigger.openMenu();
      });
  }
}
