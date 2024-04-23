import { Component, Input } from '@angular/core';
import { DomainMapping } from '@models/domain-mapping.model';
import {
  ColumnsConfiguration,
  DataColumnName,
  TableOptions,
} from 'table-generator';

@Component({
  selector: 'app-domain-mappings',
  templateUrl: './domain-mappings.component.html',
  styleUrls: ['./domain-mappings.component.scss'],
})
export class DomainMappingsComponent {
  @Input() data!: DomainMapping[];

  mainTableColumns: DataColumnName[] = ['id', 'version', 'mappingType'];
  mainTableOptions: Partial<TableOptions> = {
    showResult: false,
  };
  mainTableConfiguration: ColumnsConfiguration = {
    id: {
      translateKey: 'id',
      type: 'string',
    },
    version: {
      translateKey: 'version',
      type: 'string',
    },
    mappingType: {
      translateKey: 'mappingType',
      type: 'string',
    },
  };
}
