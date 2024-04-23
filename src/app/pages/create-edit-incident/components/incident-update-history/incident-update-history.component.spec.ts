import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePipe } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EntityType } from '@constants/entities';
import { AuditsService } from '@services/audits/audits.service';
import { selectElement } from '@testing/dom-testing-utils';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { of } from 'rxjs';
import { TableGeneratorModule } from 'table-generator';
import { IncidentUpdateHistoryComponent } from './incident-update-history.component';

describe('IncidentUpdateHistoryComponent', () => {
  let component: IncidentUpdateHistoryComponent;
  let fixture: ComponentFixture<IncidentUpdateHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncidentUpdateHistoryComponent],
      imports: [
        TableGeneratorModule,
        NoopAnimationsModule,
        TranslateTestingModule.withTranslations({ en: {} }),
      ],
      providers: [
        DatePipe,
        {
          provide: AuditsService,
          useValue: {
            getAuditsByEntityId: (type: EntityType, id: number) =>
              of([
                {
                  user: 'test',
                  time: [2020, 2, 1, 12, 0, 1],
                  revision: 0,
                  actionPerformed: 'saved',
                  technicalComplements: null,
                  entityAffectedName: null,
                  entityAffectedId: null,
                },
              ]),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentUpdateHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the table', () => {
    component.incidentId = 1;
    fixture.detectChanges();

    expect(selectElement(fixture, '#table-audit')).toBeDefined();
  });
});
