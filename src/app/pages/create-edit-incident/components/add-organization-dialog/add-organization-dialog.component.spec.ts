import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OrganizationEmbeddedDTO } from '@models/organization-embedded-dto.model';
import { OrganizationsService } from '@services/organizations/organizations.service';
import { SharedModule } from '@shared/shared.module';
import { selectAllElements, selectElement } from '@testing/dom-testing-utils';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { of, throwError } from 'rxjs';
import { AddOrganizationDialogComponent } from './add-organization-dialog.component';

describe('AddOrganizationDialogComponent', () => {
  let fakeOrganization: OrganizationEmbeddedDTO;
  let component: AddOrganizationDialogComponent;
  let organizationsService: OrganizationsService;
  let fixture: ComponentFixture<AddOrganizationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOrganizationDialogComponent],
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
          provide: OrganizationsService,
          useValue: {
            getFilteredOrganizations: (
              searchCriteria: string,
              limit: number = 1
            ) =>
              of([
                {
                  id: 1,
                  code: 'COD1',
                  version: 0,
                  name: 'resource',
                  type: 'type',
                  isActive: true,
                  financialStatusType: 'active',
                  invoice: true,
                  isPoRefMandatory: false,
                },
              ]),
            getOrganizationsByTransmissionIdList: (txs: number[]) =>
              of([
                {
                  id: 1,
                  code: 'COD1',
                  version: 0,
                  name: 'resource',
                  type: 'type',
                  isActive: true,
                  financialStatusType: 'active',
                  invoice: true,
                  isPoRefMandatory: false,
                } as OrganizationEmbeddedDTO,
              ]),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fakeOrganization = {
      id: 2,
      code: 'COD2',
      version: 0,
      name: 'ResName',
      type: 'type',
      isActive: true,
      financialStatusType: 'active',
      invoice: true,
      isPoRefMandatory: false,
    };
    organizationsService = TestBed.inject(OrganizationsService);
    fixture = TestBed.createComponent(AddOrganizationDialogComponent);
    component = fixture.componentInstance;
    component.data = {
      selectedOrganizations: [fakeOrganization],
      selectedTransmissionsIds: [1],
    };
    fixture.detectChanges();
  });

  it('should create with all sections', () => {
    const autocompleteField = selectElement(fixture, '#field-autocomplete');
    const suggestedOrganizationsList = selectElement(
      fixture,
      '#list-selection'
    );
    const cancelButton = selectElement(fixture, '#button-cancel');
    const addButton = selectElement(fixture, '#button-add');

    expect(component).toBeTruthy();
    expect(autocompleteField).toBeDefined();
    expect(suggestedOrganizationsList).toBeDefined();
    expect(cancelButton.innerText).toBe('cancel');
    expect(addButton.innerText).toBe('add');
  });

  it('should set error if suggestions failed to load', () => {
    spyOn(
      organizationsService,
      'getOrganizationsByTransmissionIdList'
    ).and.returnValue(throwError(''));

    component.ngOnInit();

    expect(component.suggestionLoadError).toBeTruthy();
  });

  it('should call service on getFilteredOrganizations', () => {
    const getFilterOrganizationsSpy = spyOn(
      organizationsService,
      'getFilteredOrganizations'
    );
    const fakeUserInput = 'test';

    component.getFilteredOrganizations(fakeUserInput);

    expect(getFilterOrganizationsSpy).toHaveBeenCalledWith(fakeUserInput);
  });

  it('should format organization display value correctly', () => {
    const expectedResult = 'COD2 - ResName';

    const formatResult =
      component.getOrganizationDisplayValue(fakeOrganization);

    expect(formatResult).toEqual(expectedResult);
  });

  it('should update suggestion and selections when a dropdown item is selected', () => {
    const fakeOrganizationCopy = { ...fakeOrganization, id: 3, code: 'COD3' };

    component.setOptionSelected(fakeOrganizationCopy);

    expect(component.suggestedOrganizations).toContain(fakeOrganizationCopy);
    expect(component.selectedOrganizations).toContain(fakeOrganizationCopy);
  });

  it('should update selection list when a suggestion selection change', () => {
    const [firstListItem] = selectAllElements(
      fixture,
      '.mat-list-item-content'
    );

    expect(component.selectedOrganizations.length).toBe(1);
    firstListItem.nativeElement.click();
    fixture.detectChanges();

    expect(component.selectedOrganizations.length).toBe(0);
    firstListItem.nativeElement.click();
    fixture.detectChanges();

    expect(component.selectedOrganizations.length).toBe(1);
  });
});
