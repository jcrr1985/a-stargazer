import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { clickElement, selectElement } from '@testing/dom-testing-utils';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { AddRemoveTableComponent } from './add-remove-table.component';

describe('AddRemoveTableComponent', () => {
  let component: AddRemoveTableComponent;
  let fixture: ComponentFixture<AddRemoveTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRemoveTableComponent],
      imports: [
        MatIconModule,
        MatTableModule,
        MatTooltipModule,
        TranslateTestingModule.withTranslations({
          en: {},
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRemoveTableComponent);
    component = fixture.componentInstance;
    component.labelTranslateKey = 'label';
    component.columnsConfiguration = [
      { accesor: 'description', headerTranslateKey: 'header' },
    ];
    component.data = [{ description: 'Some description' }];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a label', () => {
    const labelElement = selectElement(fixture, '.table-header h4');

    expect(labelElement.innerText).toEqual('LABEL');
  });
  it('should button to add', () => {
    const addButton = selectElement(fixture, '#add-button');

    expect(addButton).toBeDefined();
  });

  it('button to add should work', () => {
    const addHandlerSpy = spyOn(component.onAdd, 'emit');
    clickElement(fixture, '#add-button');

    expect(addHandlerSpy).toHaveBeenCalled();
  });

  it('should have a button to remove', () => {
    const removeButton = selectElement(fixture, '#remove-button');

    expect(removeButton).toBeDefined();
  });

  it('button to remove should work', () => {
    const removeHandlerSpy = spyOn(component.onRemove, 'emit');
    clickElement(fixture, '#remove-button');

    expect(removeHandlerSpy).toHaveBeenCalled();
  });
});
