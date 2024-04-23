import { Component, Input } from '@angular/core';
import { EntityType } from '@constants/entities';
import { AuditsService } from '@services/audits/audits.service';
import { localDateToDate } from '@shared/utils/helpers';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ColumnsConfiguration,
  DataColumnName,
  PaginatorOptions,
  TableOptions,
} from 'table-generator';

@Component({
  selector: 'app-incident-update-history',
  templateUrl: './incident-update-history.component.html',
  styleUrls: ['./incident-update-history.component.scss'],
})
export class IncidentUpdateHistoryComponent {
  @Input() incidentId?: number | null;

  data: any[] = [];

  allColumns: DataColumnName[] = [
    'revision',
    'time',
    'user',
    'actionPerformed',
  ];

  tableOptions: Partial<TableOptions> = {
    showFilter: false,
    showResult: false,
  };

  paginatorOptions: Partial<PaginatorOptions> = {
    show: false,
  };

  columnsConfiguration: ColumnsConfiguration = {
    revision: {
      translateKey: 'revision',
      type: 'number',
      width: '100px',
    },
    time: {
      translateKey: 'date',
      type: 'date',
      format: 'dd/MM/yyyy HH:mm:ss',
    },
    user: {
      translateKey: 'user',
      type: 'string',
    },
    actionPerformed: {
      translateKey: 'action',
      type: 'string',
    },
  };

  constructor(private readonly auditsService: AuditsService) {}

  get audits() {
    if (!this.incidentId) {
      return of([]);
    }

    return this.auditsService
      .getAuditsByEntityId(EntityType.INCIDENT, this.incidentId!)
      .pipe(
        map((incidentAudits) =>
          incidentAudits.map((audit) => ({
            ...audit,
            time: localDateToDate(audit.time),
          }))
        )
      );
  }
}
