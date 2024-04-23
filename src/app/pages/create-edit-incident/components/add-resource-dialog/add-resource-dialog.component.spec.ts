import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ResourceLightDTO } from '@models/resource-light-dto.model';
import { ResourceWithProfileAndEventLightDTO } from '@models/resource-with-profile-and-event-light-dto.model';
import { ResourcesService } from '@services/resources/resources.service';
import { SharedModule } from '@shared/shared.module';
import { selectAllElements, selectElement } from '@testing/dom-testing-utils';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { of, throwError } from 'rxjs';
import { AddResourceDialogComponent } from './add-resource-dialog.component';

describe('AddResourceDialogComponent', () => {
  let fakeResource: ResourceLightDTO;
  let component: AddResourceDialogComponent;
  let resourcesService: ResourcesService;
  let fixture: ComponentFixture<AddResourceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddResourceDialogComponent],
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
          provide: ResourcesService,
          useValue: {
            getFilteredResources: (searchCriteria: string, limit: number = 1) =>
              of([
                {
                  id: 1111715,
                  version: 7,
                  type: 'NETWORK',
                  code: 'UEFA 2024 UCL DIGICON 1',
                  codeLocal: 'UEFA 2024 UCL DIGICON 1',
                  name: 'UEFA 2024 UCL DIGICON 1',
                  externalName: null,
                  blackListed: false,
                },
              ]),
            getResourcesByTransmissionIdList: (txs: number[]) =>
              of([
                {
                  id: 35054,
                  version: 0,
                  type: 'NETWORK',
                  code: 'AI08GNVA_TO_MOD01ASAT_AVN(156205)',
                  codeLocal: 'AI08GNVA_TO_MOD01ASAT_AVN(156205)',
                  name: 'AI08GNVA_TO_MOD01ASAT_AVN',
                  resourceProfile: {
                    id: 104,
                    version: 0,
                    code: 'D2F_SERVICE',
                    name: 'D2F Service',
                    type: 'NETWORK',
                    canHaveProduct: false,
                  },
                  event: null,
                } as ResourceWithProfileAndEventLightDTO,
              ]),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fakeResource = {
      id: 1111715,
      version: 7,
      type: 'NETWORK',
      code: 'UCL',
      codeLocal: 'UEFA 2024 UCL DIGICON 1',
      name: 'CHAMPIONS',
      externalName: null,
      blackListed: false,
    };
    resourcesService = TestBed.inject(ResourcesService);
    fixture = TestBed.createComponent(AddResourceDialogComponent);
    component = fixture.componentInstance;
    component.data = {
      selectedResources: [fakeResource],
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
    spyOn(resourcesService, 'getResourcesByTransmissionIdList').and.returnValue(
      throwError('')
    );
    component.ngOnInit();

    expect(component.suggestionLoadError).toBeTruthy();
  });

  it('should call service on getFilteredResources', () => {
    const getFilterOrganizationsSpy = spyOn(
      resourcesService,
      'getFilteredResources'
    );
    const fakeUserInput = 'test';

    component.getFilteredResources(fakeUserInput);

    expect(getFilterOrganizationsSpy).toHaveBeenCalledWith(fakeUserInput);
  });

  it('should format resource display value correctly', () => {
    const expectedResult = 'UCL - CHAMPIONS';

    const formatResult = component.getResourceDisplayValue(fakeResource);

    expect(formatResult).toEqual(expectedResult);
  });

  it('should update suggestion and selections when a dropdown item is selected', () => {
    const fakeResourceCopy = { ...fakeResource, id: 3, code: 'COD3' };

    component.setOptionSelected(fakeResourceCopy);

    expect(component.suggestedResources).toContain(fakeResourceCopy);
    expect(component.selectedResources).toContain(fakeResourceCopy);
  });

  it('should update selection list when a suggestion selection change', () => {
    const [firstListItem] = selectAllElements(
      fixture,
      '.mat-list-item-content'
    );

    expect(component.selectedResources.length).toBe(1);
    firstListItem.nativeElement.click();
    fixture.detectChanges();

    expect(component.selectedResources.length).toBe(0);
    firstListItem.nativeElement.click();
    fixture.detectChanges();

    expect(component.selectedResources.length).toBe(1);
  });
});
