import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface ColumnConfiguration {
  accesor: string;
  headerTranslateKey: string;
}

@Component({
  selector: 'app-add-remove-table',
  templateUrl: './add-remove-table.component.html',
  styleUrls: ['./add-remove-table.component.scss'],
})
export class AddRemoveTableComponent implements OnInit {
  @Input() labelTranslateKey!: string;
  @Input() columnsConfiguration!: ColumnConfiguration[];
  @Input() data!: any[];
  @Input() canAdd: boolean = true;
  @Input() canRemove: boolean = true;
  @Output() onAdd = new EventEmitter<void>();
  @Output() onRemove = new EventEmitter<void>();
  @Input() addButtonTooltip: string = 'add';
  @Input() removeButtonTooltip: string = 'remove';
  columnsToDisplay!: string[];

  ngOnInit(): void {
    this.columnsToDisplay = this.columnsConfiguration.map(
      (columnDefinition) => columnDefinition.accesor
    );
  }

  addClicked() {
    this.onAdd.emit();
  }
  removeClicked() {
    this.onRemove.emit();
  }
}
