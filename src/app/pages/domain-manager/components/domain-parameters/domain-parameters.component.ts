import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomainItem } from '@models/domain-item.model';
import { DomainParameter } from '@models/domain-parameter.model';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import {
  ColumnsConfiguration,
  DataColumnName,
  NoDataColumnName,
  RowActionEvent,
  RowEvent,
  TableOptions,
} from 'table-generator';
import {
  DomainParameterDialogComponent,
  DomainParameterDialogData,
} from '../domain-parameter-dialog/domain-parameter-dialog.component';
import {
  DomainParameterItemDialogComponent,
  DomainParameterItemDialogData,
} from '../domain-parameter-item-dialog/domain-parameter-item-dialog.component';

export enum Actions {
  ADD_RECORD = 'add_record',
  EDIT_RECORD = 'edit_record',
  REMOVE_RECORD = 'remove_record',
}

export enum TableId {
  MAIN = 'main',
  ITEMS = 'items',
}

@Component({
  selector: 'app-domain-parameters',
  templateUrl: './domain-parameters.component.html',
  styleUrls: ['./domain-parameters.component.scss'],
})
export class DomainParametersComponent implements OnDestroy {
  TableId = TableId;
  @Input() data!: DomainParameter[];
  @Output() onDataChanged = new EventEmitter<DomainParameter[]>();

  private _onDestroy$ = new Subject<void>();
  selectedDomainParameter: DomainParameter | null = null;

  tableActions = [
    {
      id: Actions.ADD_RECORD,
      icon: 'add',
      translateKey: 'add',
      color: 'primary',
      disabled: false,
    },
  ];

  rowActions = [
    {
      id: Actions.REMOVE_RECORD,
      icon: 'delete',
      translateKey: 'delete',
      color: 'warn',
    },
  ];

  mainTableColumns: DataColumnName[] = [
    'groupCode',
    'code',
    'label',
    'externalLabel',
    'domainStatus',
    NoDataColumnName.columnsSelector,
  ];

  mainTableOptions: Partial<TableOptions> = {
    showResult: false,
    multipleRowsSelected: false,
  };

  mainTableConfiguration: ColumnsConfiguration = {
    groupCode: {
      translateKey: 'groupCode',
      type: 'string',
    },
    code: {
      translateKey: 'code',
      type: 'string',
    },
    label: {
      translateKey: 'label',
      type: 'string',
    },
    externalLabel: {
      translateKey: 'externalLabel',
      type: 'string',
    },
    domainStatus: {
      translateKey: 'domainStatus',
      type: 'string',
    },
  };

  itemsTableColumns: DataColumnName[] = [
    'sequence',
    'code',
    'isoCode',
    'externalCode',
    'label',
    'extView',
    'externalLabel',
    'status',
    NoDataColumnName.columnsSelector,
  ];

  itemsTableOptions: Partial<TableOptions> = {
    showResult: false,
    multipleRowsSelected: false,
    showFilter: false,
  };

  itemsTableConfiguration: ColumnsConfiguration = {
    sequence: {
      translateKey: 'sequence',
      type: 'number',
    },
    code: {
      translateKey: 'code',
      type: 'string',
    },
    isoCode: {
      translateKey: 'isoCode',
      type: 'string',
    },
    externalCode: {
      translateKey: 'externalCode',
      type: 'string',
    },
    label: {
      translateKey: 'label',
      type: 'string',
    },
    externalLabel: {
      translateKey: 'externalLabel',
      type: 'string',
    },
    extView: {
      translateKey: 'published',
      type: 'boolean',
    },
    status: {
      translateKey: 'status',
      type: 'string',
    },
  };

  constructor(private readonly dialog: MatDialog) {}

  ngOnDestroy(): void {
    this._onDestroy$.next();
  }

  onRowClicked({ row }: RowEvent<DomainParameter>) {
    this.selectedDomainParameter = null;

    if (row) {
      this.selectedDomainParameter = row;
    }
  }

  async onRowDoubleClicked(
    { row }: RowEvent<DomainParameter> | RowEvent<DomainItem>,
    tableId: TableId
  ) {
    if (tableId === TableId.MAIN) {
      const editedIndex = this.data.findIndex(
        (domainParam) => domainParam.id === row.id
      );

      const edited = await this.openParameterDialog(row as DomainParameter);

      if (edited) {
        this.data[editedIndex] = edited;
        this.data = [...this.data];
      }
    }

    if (tableId === TableId.ITEMS) {
      const editedIndex = this.data.findIndex(
        (domainParam) => domainParam.id === this.selectedDomainParameter!.id
      );
      const editedItemIndex = this.data[editedIndex].items.findIndex(
        (item) => item.id === row.id
      );

      const edited = await this.openItemDialog(row as DomainItem);

      if (edited) {
        // To be able to save in the API, when we update an item, we need to
        // mark its parent DomainParameter as modified
        this.data[editedIndex].isModified = true;
        this.data[editedIndex].items.splice(editedItemIndex, 1, edited);
        this.data[editedIndex].items = [...this.data[editedIndex].items];
      }
    }

    this.onDataChanged.emit(this.data);
  }

  async onRowAction(
    {
      action: { id },
      row,
    }: RowActionEvent<DomainParameter> | RowActionEvent<DomainItem>,
    tableId: TableId
  ) {
    if (tableId === TableId.MAIN) {
      const editedIndex = this.data.findIndex(
        (domainParam) => domainParam.id === row.id
      );

      if (id === Actions.REMOVE_RECORD) {
        // The API, delete a domain param if it is not found on the list
        this.data.splice(editedIndex, 1);
      }

      this.data = [...this.data];
    }

    if (tableId === TableId.ITEMS) {
      const editedIndex = this.data.findIndex(
        (domainParam) => domainParam.id === this.selectedDomainParameter!.id
      );
      const editedItemIndex = this.data[editedIndex].items.findIndex(
        (item) => item.id === row.id
      );

      if (id === Actions.REMOVE_RECORD) {
        // The API, to delete a Domain Param item, needs to receive the array
        // without the removed element, and its parent entity flagged as edited.
        this.data[editedIndex].isModified = true;
        this.data[editedIndex].items.splice(editedItemIndex, 1);
      }

      this.data[editedIndex].items = [...this.data[editedIndex].items];
    }

    this.onDataChanged.emit(this.data);
  }

  async onTableAction({ action: { id: actionId } }: any, tableId: TableId) {
    if (actionId !== Actions.ADD_RECORD) {
      return;
    }

    if (tableId === TableId.MAIN) {
      const newDomainParameter = await this.openParameterDialog();

      if (newDomainParameter) {
        this.data = [newDomainParameter, ...this.data];
      }
    }

    if (tableId === TableId.ITEMS) {
      const newItem = await this.openItemDialog();

      if (newItem) {
        const editIndex = this.data.findIndex(
          (elem) => elem.id === this.selectedDomainParameter!.id
        );

        // To be able to save in the API we need to mark item parent Domain
        // parameter as modified

        this.data[editIndex].isModified = true;
        this.data[editIndex].items = [newItem, ...this.data[editIndex].items];
        this.data = [...this.data];
      }
    }

    this.onDataChanged.emit(this.data);
  }

  openParameterDialog(
    domainParameter?: DomainParameter
  ): Promise<DomainParameter> {
    const parameterFormDialog = this.dialog.open(
      DomainParameterDialogComponent,
      {
        width: 'fit-content',
        disableClose: true,
        data: {
          domainParameter,
        } as DomainParameterDialogData,
      }
    );

    return parameterFormDialog
      .afterClosed()
      .pipe(tap(() => takeUntil(this._onDestroy$)))
      .toPromise();
  }

  getNextSequenceId() {
    const sorted = this.selectedDomainParameter?.items
      .map((elem) => elem.sequence)
      .sort((elemA: number, elemB: number) => elemA - elemB)
      .reverse();

    return sorted && sorted[0] ? sorted[0] + 1 : 1;
  }

  openItemDialog(domainItem?: DomainItem): Promise<DomainItem> {
    const itemFormDialog = this.dialog.open(
      DomainParameterItemDialogComponent,
      {
        width: 'fit-content',
        disableClose: true,
        data: {
          domainItem,
          sequenceId: domainItem?.sequence ?? this.getNextSequenceId(),
        } as DomainParameterItemDialogData,
      }
    );

    return itemFormDialog
      .afterClosed()
      .pipe(tap(() => takeUntil(this._onDestroy$)))
      .toPromise();
  }
}
