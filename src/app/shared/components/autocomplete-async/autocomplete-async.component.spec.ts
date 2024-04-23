import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { selectElement } from '@testing/dom-testing-utils';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { of, throwError } from 'rxjs';
import { AutocompleteAsyncComponent } from './autocomplete-async.component';

describe('AutocompleteAsyncComponent', () => {
  let component: AutocompleteAsyncComponent;
  let fixture: ComponentFixture<AutocompleteAsyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutocompleteAsyncComponent],
      imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        FormsModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatOptionModule,
        NoopAnimationsModule,
        TranslateTestingModule.withTranslations({ en: {} }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteAsyncComponent);
    component = fixture.componentInstance;
    component.labelTranslateKey = 'Label';
    component.displayValueFormatter = (val) => val;
    component.searchMethod = (inputValue: string) => of([inputValue, 'other']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set loaded options on input', waitForAsync(() => {
    const inputElement = selectElement<HTMLInputElement>(
      fixture,
      '#input-field'
    );
    inputElement.dispatchEvent(new Event('focusin'));
    inputElement.value = 'TEST';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.loading).toBeFalsy();
      expect(component.error).toBeFalsy();
      expect(component.filteredOptions).toEqual(['TEST', 'other']);
    });
  }));

  it('should set error if search failed', waitForAsync(() => {
    component.searchMethod = (inputValue: string) =>
      throwError([inputValue, 'other']);
    const inputElement = selectElement<HTMLInputElement>(
      fixture,
      '#input-field'
    );
    inputElement.dispatchEvent(new Event('focusin'));
    inputElement.value = 'TEST';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.loading).toBeFalsy();
      expect(component.error).toBeTruthy();
    });
  }));

  it('should emit selection on option selected', () => {
    const emitSpy = spyOn(component.onSelectedOption, 'emit');
    const fakeSelectedValue = { organization: 'UEFA' };

    component.optionSelectedHandler(fakeSelectedValue);

    expect(emitSpy).toHaveBeenCalledWith(fakeSelectedValue);
  });
});
