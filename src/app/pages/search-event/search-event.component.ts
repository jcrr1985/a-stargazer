import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { EntityType } from '@constants/entities';
import { EventSearchCriteria, EventSearchResultData } from '@models/models';
import { Note } from '@models/note.model';
import { EventsService } from '@services/events/events.service';
import { NotesService } from '@services/notes/notes.service';
import { TabDetail, TabsService } from '@services/tabs/tabs.service';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import {
  ColumnsConfiguration,
  DataColumnName,
  NoDataColumnName,
} from 'table-generator';

@Component({
  selector: 'app-search-event',
  templateUrl: './search-event.component.html',
  styleUrls: ['./search-event.component.scss'],
})
export class SearchEventComponent implements AfterViewInit, OnDestroy {
  @Input() tabData!: TabDetail;

  private _onDestroy$ = new Subject<void>();

  data: EventSearchResultData[] = [];
  allColumns: DataColumnName[] = [
    'notes',
    'no',
    'periodBegin',
    'periodEnd',
    'description',
    'eventType',
    'city',
    'status',
    'deadline',
    'category',
    'subCategory',
    'office',
    'quoteId',
    'isPMO',
    NoDataColumnName.columnsSelector,
  ];

  columnsConfiguration: ColumnsConfiguration = {
    notes: {
      translateKey: 'notes',
      type: 'tooltip',
      searchMethod: (row: EventSearchResultData) =>
        this.getNoteDescriptionsbyId(row.id),
      icon: 'assignment',
    },
    no: {
      translateKey: 'eventNo',
      type: 'number',
    },

    periodBegin: {
      translateKey: 'startDate',
      type: 'date',
      format: 'dd/MM/yyyy',
    },
    periodEnd: {
      translateKey: 'endDate',
      type: 'date',
      format: 'dd/MM/yyyy',
    },
    description: {
      translateKey: 'description',
      type: 'string',
    },
    eventType: {
      translateKey: 'type',
      type: 'string',
    },
    city: {
      translateKey: 'city',
      type: 'string',
    },
    status: {
      translateKey: 'status',
      type: 'string',
    },
    deadline: {
      type: 'date',
      format: 'dd/MM/yyyy',
      translateKey: 'deadline',
    },
    category: {
      translateKey: 'category',
      type: 'string',
    },
    subCategory: {
      translateKey: 'subCategory',
      type: 'string',
    },
    office: {
      translateKey: 'office',
      type: 'string',
    },
    quoteId: {
      translateKey: 'quoteId',
      type: 'string',
    },
    isPMO: {
      translateKey: 'isPMO',
      type: 'boolean',
    },
  };

  constructor(
    readonly tabsService: TabsService,
    private eventsService: EventsService,
    private notesService: NotesService
  ) {}

  ngAfterViewInit(): void {
    const tabContext = this.tabsService.getActiveTabData().contextData;
    if (tabContext) {
      if (tabContext.results) {
        this.data = tabContext.results;
      }
    }
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
  }

  getNoteDescriptionsbyId(id: number): Observable<string> {
    return this.notesService.getNotesByEntityId(id, EntityType.EVENT).pipe(
      map((notes: Note[]) => {
        let formattedNoteDescriptions: string = '';
        notes.forEach((note, index) => {
          formattedNoteDescriptions += note.description;
          if (index !== notes.length - 1) {
            formattedNoteDescriptions += '\n --------- \n';
          }
        });

        formattedNoteDescriptions +=
          '\n --------- \nThere is at least one attachment in the notes';

        return formattedNoteDescriptions;
      })
    );
  }

  fetchDataSource(formValue: EventSearchCriteria) {
    this.eventsService
      .searchEvents(formValue)
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((results) => {
        this.tabsService.patchActiveTabContext({
          results,
        });
        this.data = results;
      });
  }
}
