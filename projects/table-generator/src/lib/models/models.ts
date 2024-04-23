import { Observable } from 'rxjs';

export interface ColumnsConfiguration {
  [key: string]:
    | CommonConfiguartion &
        (
          | StringConfiguration
          | NumberConfiguration
          | DateConfiguration
          | BooleanConfiguration
          | TooltipConfiguration
          | ObjectConfiguration
          | CHeckboxConfiguration
        );
}

export interface TooltipConfiguration {
  icon?: string;
  searchMethod: (rowData: any) => Observable<string>;
  type: 'tooltip';
}

export interface CHeckboxConfiguration {
  type: 'checkbox';
}
export interface StringConfiguration {
  /**
   * Cell data type
   */
  type: 'string';
}

export interface NumberConfiguration {
  /**
   * Cell data type
   */
  type: 'number';
}

export interface BooleanConfiguration {
  /**
   * Cell data type
   */
  type: 'boolean';

  /**
   * Icon when value is `true`
   */
  iconTrue?: string;

  /**
   * Icon when value is `undefined` or `false`
   */
  iconFalse?: string;
}

export interface DateConfiguration {
  /**
   * Cell data type
   */
  type: 'date';

  /**
   * Date format. Use https://angular.io/api/common/DatePipe
   */
  format: string;
}

export interface TooltipConfiguration {
  /**
   * Cell data type
   */
  type: 'tooltip';

  /**
   * Cell icon for tooltip
   *
   * @default 'info'
   */
  icon?: string;

  /**
   * Fetching data request
   */
  searchMethod: (row: any) => Observable<string>;
}

export interface ObjectConfiguration {
  /**
   * Cell data type
   */
  type: 'object';

  /**
   * How to display an object
   */
  displayWith: (object: any) => string;
}

export interface CommonConfiguartion {
  /**
   * Cell data type
   */
  type:
    | 'string'
    | 'number'
    | 'boolean'
    | 'date'
    | 'tooltip'
    | 'object'
    | 'checkbox';

  /**
   * The translate key from i18n folder (if you don't have the key en i18n folder, component use the inserted word)
   */
  translateKey: string;

  /**
   * Column width
   *
   * @example
   * 100% | '100px'
   */
  width?: string;
}

/**
 * The paginator options
 *
 * @default
 * {
 *  show: true,
 *  pageSizeOptions: [10, 20, 50, 100],
 *  pageSize: 10,
 *  pageIndex: 0,
 *  showFirstLastButtons: true
 * }
 */
export interface PaginatorOptions {
  show?: boolean;
  pageSizeOptions: number[];
  pageSize?: number;
  pageIndex?: number;
  showFirstLastButtons?: boolean;
}

/**
 * The Table Generator options
 *
 * @default
 * {
 *  showHeaderWhenContentNoData: true,
 *  showMenuActions:true,
 *  showFilter: true,
 *  showResult: true,
 *  markRowSelected: true,
 *  showRowsSelector: true,
 *  multipleRowsSelected: true,
 *  showColumnsSelector: true,
 *  showTableActions: true,
 *  showRowActions: true
 * }
 */
export interface TableOptions {
  /**
   * Show table ' th' element when there is no data
   */
  showHeaderWhenContentNoData: boolean;

  /**
   * Show menu actions (right click)
   */
  showMenuActions: boolean;

  /**
   * Show filter input for table
   */
  showFilter: boolean;

  /**
   * Show result text
   */
  showResult: boolean;

  /**
   * Add color to row selected
   */
  markRowSelected: boolean;

  /**
   * Show column `rowsSelector`
   */
  showRowsSelector: boolean;

  /**
   * if can select multiple rows
   */
  multipleRowsSelected: boolean;

  /**
   * Show column `columnsSelector`
   */
  showColumnsSelector: boolean;

  /**
   * Show table `tableActions`
   */
  showTableActions: boolean;

  /**
   * Show column `rowActions`
   */
  showRowActions: boolean;
}

/**
 * The object key string
 *
 * Reserved word:
 * - `columnsSelector` is a reserved word to pick the visible columns and show actions per row
 * - `rowsSelector` is a reserved word to select the rows
 */
export type DataColumnName = string | NoDataColumnName;

/**
 * Reserved word:
 * - `columnsSelector` is a reserved word to pick the visible columns and show actions per row
 * - `rowsSelector` is a reserved word to select the rows
 */
export enum NoDataColumnName {
  columnsSelector = 'columnsSelector',
  rowsSelector = 'rowsSelector',
}

/**
 * Menu per row
 */
export interface RowMenuAction<T> {
  /**
   * Action idertifier
   */
  id?: string;

  /**
   * The translate key from i18n folder (if you don't have the key en i18n folder, component use the inserted word)
   */
  translateKey: string;

  /**
   * Disable action
   */
  isDisabled?: (row: T) => boolean;
}

/**
 * The emit when click on an action per menu per row
 */
export interface RowMenuActionEvent<T> {
  /**
   * The row data
   */
  row: T;

  /**
   * The menu per row
   */
  action: RowMenuAction<T>;

  /**
   * The action click event
   */
  event?: Event;
}

/**
 * Table action
 */
export interface TableAction {
  /**
   * Action idertifier
   */
  id: string;

  /**
   * The translate key from i18n folder (if you don't have the key en i18n folder, component use the inserted word)
   */
  translateKey?: string;

  /**
   * The action icon
   */
  icon: string;

  /**
   * The action background color
   */
  bgColor?: string;

  /**
   * The action color
   */
  color?: string;

  /**
   * Disable action
   */
  disabled?: boolean;
}

/**
 * Table action event
 */
export interface TableActionEvent {
  /**
   * The table action
   */
  action: TableAction;

  /**
   * The action click event
   */
  event?: Event;
}

/**
 * Row action
 */
export interface RowAction<T> {
  /**
   * Action idertifier
   */
  id: string;

  /**
   * The translate key from i18n folder (if you don't have the key en i18n folder, component use the inserted word)
   */
  translateKey?: string;

  /**
   * The action icon
   */
  icon: string;

  /**
   * The action background color
   */
  bgColor?: string;

  /**
   * The action color
   */
  color?: string;

  /**
   * Disable action
   */
  isDisabled?: (row: T) => boolean;
}

/**
 * Row action event
 */
export interface RowActionEvent<T> {
  /**
   * The row data
   */
  row: T;

  /**
   * The menu per row
   */
  action: RowAction<T>;

  /**
   * The action click event
   */
  event?: Event;
}

/**
 * Row click and double click events
 */
export interface RowEvent<T> {
  /**
   * The row data
   */
  row: T;

  /**
   * The action click event
   */
  event?: Event;
}

export interface tooltipMenuPosition {
  /**
   * The x position of the tooltip menu
   */
  x: string;

  /**
   * The y position of the tooltip menu
   */
  y: string;
}
