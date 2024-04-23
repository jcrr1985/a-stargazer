import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePipe } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EntityType } from '@constants/entities';
import { AttachmentsService } from '@services/attachments/attachments.service';
import { selectElement } from '@testing/dom-testing-utils';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { of } from 'rxjs';
import { TableGeneratorModule } from 'table-generator';
import { IncidentAttachmentsComponent } from './incident-attachments.component';

describe('IncidentAttachmentsComponent', () => {
  let component: IncidentAttachmentsComponent;
  let attachmentService: AttachmentsService;
  let fixture: ComponentFixture<IncidentAttachmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncidentAttachmentsComponent],
      imports: [
        TableGeneratorModule,
        NoopAnimationsModule,
        TranslateTestingModule.withTranslations({ en: {} }),
      ],
      providers: [
        DatePipe,
        {
          provide: AttachmentsService,
          useValue: {
            saveAttachmentsByEntityId: (
              fileBase64: string,
              filename: string,
              entity: EntityType,
              entityid: number
            ) => of({}),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    attachmentService = TestBed.inject(AttachmentsService);
    fixture = TestBed.createComponent(IncidentAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should detect file input change and call handler', () => {
    spyOn(component, 'onFileSelected').and.callThrough();
    spyOn(attachmentService, 'saveAttachmentsByEntityId').and.callThrough();
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(new File(['ab', '00'], 'test-file.pdf'));
    const inputElement = selectElement<HTMLInputElement>(
      fixture,
      'input[type=file]'
    );
    inputElement.files = dataTransfer.files;

    inputElement.dispatchEvent(new InputEvent('change'));
    fixture.detectChanges();

    expect(component.onFileSelected).toHaveBeenCalled();
  });
});
