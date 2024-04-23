import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DomainMapping } from '@models/domain-mapping.model';
import { SharedModule } from '@shared/shared.module';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { DomainMappingsComponent } from './domain-mappings.component';

describe('DomainMappingsComponent', () => {
  let component: DomainMappingsComponent;
  let fixture: ComponentFixture<DomainMappingsComponent>;
  let domainMappings: DomainMapping[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DomainMappingsComponent],
      imports: [
        SharedModule,
        NoopAnimationsModule,
        TranslateTestingModule.withTranslations({ en: {} }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    domainMappings = [
      {
        version: 0,
        id: 2,
        mappingType: 'COMM_BITRATE',
        item: {
          version: 355,
          id: 515,
          sequence: 10,
          keyCode: 'COMM_BITRATE@5SD',
          code: '5SD',
          isoCode: null,
          externalCode: '5SD',
          label: '5 Mbps SD',
          extView: false,
          externalLabel: '5 Mbps SD',
          itemStatus: 'ACTIVE',
          businessKey: 'COMM_BITRATE@5SD',
          new: false,
        },
        mappedItems: [
          {
            version: 0,
            id: 3110,
            item: {
              version: 0,
              id: 299,
              sequence: 1,
              keyCode: 'D2F_SLOT@10',
              code: '10',
              isoCode: null,
              externalCode: null,
              label: '10 slots',
              extView: true,
              externalLabel: null,
              itemStatus: 'ACTIVE',
              businessKey: 'D2F_SLOT@10',
              new: false,
            },
            businessKey: '3110',
            new: false,
          },
        ],
        isModified: false,
        isRemoved: false,
        businessKey: '2',
        new: false,
      },
    ];
    fixture = TestBed.createComponent(DomainMappingsComponent);
    component = fixture.componentInstance;
    component.data = domainMappings;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
