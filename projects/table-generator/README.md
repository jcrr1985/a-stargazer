# TableGenerator

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.14.

## How to use

1. You need to add `TableGeneratorModule` in the parent module

```ts
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ...
    TableGeneratorModule
  ],
  bootstrap: [AppComponent],
  providers: [],
```

2. Use in html file

```html
<talan-table-generator
  [data]="data"
  [allColumns]="allColumns"
  [columnsConfiguration]="columnsConfiguration">
</talan-table-generator>
```

For more information you can visit the [models](../table-generator/src/lib/models/models.ts) file.

### Full example:

```html
<talan-table-generator
  [tableOptions]="tableOptions"
  [paginatorOptions]="paginatorOptions"
  [filterValue]="filterValue"
  [data]="data"
  [allColumns]="allColumns"
  [columnsConfiguration]="columnsConfiguration"
  [rowsSelected]="rowsSelected"
  [tableActions]="tableActions"
  [rowActions]="rowActions"
  [rowMenuActions]="rowMenuActions"
  (rowsSelectedChange)="rowSelectedChange($event)"
  (rowMenuAction)="rowMenuAction($event)"
  (pageChange)="pageChange($event)"
  [rowClickDelay]="rowClickDelay"
  (rowClick)="onRowClick($event)"
  (rowDblClick)="onRowDblClick($event)">
</talan-table-generator>
```

```ts
/**
 * Click delay
 *
 * @default 200
 */
rowClickDelay = 200;

/**
 * Default tableOptions
 */
tableOptions: TableOptions = {
  showHeaderWhenContentNoData: true,
  showMenuActions:true,
  showFilter: true,
  showResult: true,
  markRowSelected: true,
  showRowsSelector: true,
  multipleRowsSelected: true,
  showColumnsSelector: true,
  showTableActions: true,
  showRowActions: true
};

/**
 * Default paginatorOptions
 */
paginatorOptions: PaginatorOptions = {
  show: true,
  pageSizeOptions: [10, 20, 50, 100],
  pageSize: 10,
  pageIndex: 0,
  showFirstLastButtons: true
}

/**
 * Default filterValue
 */
filterValue = '';

/**
 * Reserved word:
 * - `columnsSelector` is a reserved word to pick the visible columns and show actions per row
 * - `rowsSelector` is a reserved word to select the rows
 */
allColumns: DataColumnName[] = [
  NoDataColumnName.rowsSelector,
  'boolean',
  'number',
  'date',
  'string',
  NoDataColumnName.columnsSelector,
];

data: T[] = [
  {
    boolean: true,
    number: 1234,
    date: '2023-02-24',
    string: 'string',
  },
  {
    boolean: false,
    number: 1234,
    date: '2023-02-23',
    string: 'string',
  }
];

columnsConfiguration: ColumnsConfiguration = {
  boolean: {
    type: 'boolean',
    translateKey: 'boolean',
    iconFalse: 'close',
    iconTrue: 'check',
    width: '100px',
  },
  number: {
    type: 'number',
    translateKey: 'number',
    width: '100px',
  },
  date: {
    type: 'date',
    translateKey: 'date',
    format: 'dd/MM/yyyy',
    width: '100px',
  },
  string: {
    type: 'string',
    translateKey: 'string',
    width: '100px',
  },
  tooltip: {
    type: 'tooltip',
    icon: 'info',
    searchMethod: (row: T) => of('data'),
  },
  object: {
    type: 'object',
    displayWith: (objectData) => objectData.name,
  },
};

rowsSelected: T[] = [
  {
    boolean: true,
    number: 1234,
    date: '2023-02-24',
    string: 'string',
  },
]

tableActions: TableActon[] = [
    {
    id: 'new',
    translateKey: 'new',
    icon: 'new',
    disabled: false,
  },
]

rowActions: RowAction<T>[] = [
  {
    id: 'edit',
    translateKey: 'edit',
    icon: 'edit',
    isDisabled: (row: T) => false,
  },
  {
    id: 'delete',
    translateKey: 'delete',
    icon: 'delete',
    isDisabled: (row: T) => true,
  },
];

rowMenuActions: RowMenuAction<T>[] = [
  {
    id: '1',
    translateKey: 'action1',
    isDisabled: () => false,
  },
  {
    id: '2',
    translateKey: 'action2',
    isDisabled: () => false,
  },
];

rowMenuAction(event: RowMenuActionEvent<T>) {
  console.log(event);
}

tableAction(event: TableActionEvent) {
  const { action, event } = event;
  console.log({ action, event });
}

rowAction(event: RowActionEvent<T>) {
  const { row, action, event } = event;
  console.log({ row, action, event });
}

onRowClick(event: RowEvent<T>) {
  const { row, event } = event;
  console.log({ row, event });
}

rowSelectedChange(event: T[]) {
  console.log(event);
}

onRowDblClick(event: RowEvent<T>) {
  const { row, event } = event;
  console.log({ row, event });
}

pageChange(event: PageEvent) {
  const { pageIndex, previousPageIndex, pageSize, length } = event;
  console.log({ pageIndex, previousPageIndex, pageSize, length });
}
```
