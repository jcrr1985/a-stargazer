import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TransmissionLightDTO } from '@models/transmission-light-dto.model';
import { TransmissionsService } from '@services/transmissions/transmissions.service';
import { SharedModule } from '@shared/shared.module';
import { selectElement } from '@testing/dom-testing-utils';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { of } from 'rxjs';
import { AddTransmissionDialogComponent } from './add-transmission-dialog.component';

describe('AddTransmissionDialogComponent', () => {
  let fakeTransmission: TransmissionLightDTO;
  let component: AddTransmissionDialogComponent;
  let transmissionsService: TransmissionsService;
  let fixture: ComponentFixture<AddTransmissionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTransmissionDialogComponent],
      imports: [
        MatDialogModule,
        MatDividerModule,
        MatButtonModule,
        SharedModule,
        NoopAnimationsModule,
        TranslateTestingModule.withTranslations({ en: {} }),
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
        {
          provide: TransmissionsService,
          useValue: {
            getFilteredTransmissions: (
              searchCriteria: string,
              limit: number = 1
            ) =>
              of([
                {
                  id: 4104,
                  version: 13,
                  no: '00-1',
                  title: 'UEL MD11 - Highlights',
                  description: 'Start: 0900 GMT',
                  startDate: [2016, 4, 8, 8, 45],
                  endDate: [2016, 4, 8, 10, 0],
                  status: 'COMPLETED',
                  event: {
                    id: 10388,
                    version: 7,
                    periodBegin: [2015, 8, 6],
                    periodEnd: [2016, 6, 1],
                    no: 35339,
                    description: 'FOOTBALL: UEFA Distribution over Africa',
                    eventType: {
                      id: 3137,
                      version: 220,
                      sequence: 8,
                      keyCode: 'EVENT_TYPE@PROG',
                      code: 'PROG',
                      externalCode: null,
                      label: 'Programme',
                      extView: true,
                      externalLabel: null,
                      itemStatus: 'ACTIVE',
                    },
                  },
                },
              ]),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fakeTransmission = {
      id: 4105,
      version: 14,
      no: '2',
      title: 'UEL Match',
      description: 'Start: 0900 GMT',
      startDate: [2016, 4, 8, 8, 45],
      endDate: [2016, 4, 8, 10, 0],
      status: 'COMPLETED',
      event: {
        id: 10388,
        version: 7,
        periodBegin: [2015, 8, 6],
        periodEnd: [2016, 6, 1],
        no: 35339,
        description: 'FOOTBALL: UEFA Distribution over Africa',
        eventType: {
          id: 3137,
          version: 220,
          sequence: 8,
          keyCode: 'EVENT_TYPE@PROG',
          code: 'PROG',
          externalCode: null,
          label: 'Programme',
          extView: true,
          externalLabel: null,
          itemStatus: 'ACTIVE',
        },
      },
    };
    transmissionsService = TestBed.inject(TransmissionsService);
    fixture = TestBed.createComponent(AddTransmissionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with all sections', () => {
    const autocompleteField = selectElement(fixture, '#field-autocomplete');
    const cancelButton = selectElement(fixture, '#button-cancel');
    const addButton = selectElement(fixture, '#button-add');

    expect(component).toBeTruthy();
    expect(autocompleteField).toBeDefined();
    expect(cancelButton.innerText).toBe('cancel');
    expect(addButton.innerText).toBe('add');
  });

  it('should call service on getFilteredResources', () => {
    const getFilterOrganizationsSpy = spyOn(
      transmissionsService,
      'getFilteredTransmissions'
    );
    const fakeUserInput = 'test';

    component.getFilteredTransmissions(fakeUserInput);

    expect(getFilterOrganizationsSpy).toHaveBeenCalledWith(fakeUserInput);
  });

  it('should update suggestion and selections when a dropdown item is selected', () => {
    const fakeTransmissionCopy = { ...fakeTransmission, id: 3, code: 'COD3' };

    component.setOptionSelected(fakeTransmissionCopy);

    expect(component.selected).toEqual(fakeTransmissionCopy);
  });

  it('should format transmission display value correctly', () => {
    const expectedResult = '2 - UEL Match';

    const formatResult =
      component.getTransmissionDisplayValue(fakeTransmission);

    expect(formatResult).toEqual(expectedResult);
  });
});
