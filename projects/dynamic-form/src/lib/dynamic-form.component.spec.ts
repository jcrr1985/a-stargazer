import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AsyncValidatorFn,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATEPICKER_SCROLL_STRATEGY } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatDatetimepickerModule,
  MatNativeDatetimeModule,
} from '@mat-datetimepicker/core';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { of } from 'rxjs';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DatetimeComponent } from './components/datetime/datetime.component';
import { EmptyComponent } from './components/empty/empty.component';
import { InputComponent } from './components/input/input.component';
import { RadioComponent } from './components/radio/radio.component';
import { SelectComponent } from './components/select/select.component';
import { SliderComponent } from './components/slider/slider.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { DynamicComponentDirective } from './directives/dynamic-component.directive';
import { DynamicFormComponent } from './dynamic-form.component';
import { FieldConfiguration } from './models/models';
import { SafeHtmlPipe } from './pipe/safe-html/safe-html.pipe';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DynamicFormComponent,
        AutocompleteComponent,
        CheckboxComponent,
        DatetimeComponent,
        EmptyComponent,
        InputComponent,
        RadioComponent,
        SelectComponent,
        SliderComponent,
        TextareaComponent,
        ToggleComponent,
        DynamicComponentDirective,
        SafeHtmlPipe,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatDatetimepickerModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatSliderModule,
        MatTooltipModule,
        MatDividerModule,
        MatSlideToggleModule,
        MatNativeDatetimeModule,
        MatSlideToggleModule,
        MatAutocompleteModule,
        TranslateTestingModule.withTranslations({ en: {} }),
      ],
      providers: [
        {
          provide: MAT_DATEPICKER_SCROLL_STRATEGY,
          useFactory: (overlay: Overlay) => () =>
            overlay.scrollStrategies.reposition(),
          deps: [Overlay],
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;

    component.fields = [
      { type: 'input', name: 'testInput', value: 'test', disabled: false },
      { type: 'checkbox', name: 'testCheckbox', value: true, disabled: false },
      {
        type: 'datetime',
        name: 'testDatetime',
        value: new Date(),
        disabled: false,
      },
      {
        name: 'radioName',
        label: 'Test Label',
        type: 'radio',
        hintStart: 'Start hint text',
        hintEnd: 'End hint text',
        placeholder: 'Test Placeholder',
        labelPosition: 'after',
        value: 'test',
        options: [
          { text: 'Option 1', value: 'option1' },
          { text: 'Option 2', value: 'option2' },
        ],
      },
      {
        type: 'select',
        options: ['option1', 'option2'],
        name: 'selectName',
        label: 'label',
        hintEnd: 'End hint text',
        hintStart: 'Start hint text',
        placeholder: 'Test Placeholder',
        multiple: false,
      },
      {
        type: 'slider',
        name: 'sliderName',
        label: 'label',
        hintEnd: 'End hint text',
        hintStart: 'Start hint text',
        placeholder: 'Test Placeholder',
        min: 0,
        max: 100,
        step: 1,
        thumbLabel: true,
        tickInterval: 1,
        value: 0,
      },
      {
        type: 'textarea',
        name: 'textareaName',
        value: 'some text',
        disabled: false,
      },
      {
        type: 'toggle',
        name: 'toggleName',
        value: true,
        disabled: false,
      },
      {
        type: 'autocomplete',
        name: 'autocompleteName',
        apiMethod: (value: string) =>
          of([{ name: 'Test1' }, { name: 'Test2' }]),
        displayWith: (value: any) => value.name,
      },
      { type: 'empty' },
    ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event onSubmit when valid form', () => {
    const spy = spyOn(component.submit, 'emit');

    component.onSubmit();

    expect(spy).toHaveBeenCalled();
  });

  it('should call markAllAsTouched when invalid form', () => {
    const spy = spyOn(component.formGroup, 'markAllAsTouched');

    component.formGroup.setErrors({ mockError: true });

    component.onSubmit();

    expect(spy).toHaveBeenCalled();
  });

  it('should emit enter and call onSubmit', () => {
    const spy = spyOn(component.enter, 'emit');
    component.preventEnterSubmit = false;

    component.onEnter();

    expect(spy).toHaveBeenCalled();
  });

  it('should emit enter and call markAllAsTouched when invalid form', () => {
    const spy = spyOn(component.enter, 'emit');
    component.preventEnterSubmit = true;

    component.formGroup.setErrors({ mockError: true });

    component.onEnter();

    expect(spy).toHaveBeenCalled();
  });

  it('should not create form control for empty type field', () => {
    const fields: FieldConfiguration[] = [{ type: 'empty' }];

    component.fields = fields;
    fixture.detectChanges();

    expect(component.formGroup.contains('testEmpty')).toBeFalsy();
  });

  it('invalid `fields` format, should be an array', () => {
    component.fields = null as any;

    expect(component.fields).toEqual([]);
  });

  it('should set fields if provided an array', () => {
    const mockFields: FieldConfiguration[] = [
      { type: 'input', name: 'testInput', value: 'test', disabled: false },
    ];

    component.fields = mockFields;

    expect(component['_fields']).toBe(mockFields);
  });

  it('should set asyncValidators correctly', () => {
    const mockAsyncValidators: AsyncValidatorFn[] = [];

    component.asyncValidators = mockAsyncValidators;

    expect(component['_asyncValidators']).toBe(mockAsyncValidators);
  });

  it('should set validators correctly', () => {
    const mockValidators: ValidatorFn[] = [];

    component.validators = mockValidators;

    expect(component['_validators']).toBe(mockValidators);
  });

  it('should set updateOn correctly', () => {
    component.updateOn = 'blur';

    expect(component['_updateOn']).toBe('blur');
  });

  it('should default updateOn to change when given undefined or null', () => {
    component.updateOn = null as any;

    expect(component['_updateOn']).toBe('change');
  });

  it('should throw an error if field type is not provided', () => {
    expect(() => {
      component.isValidField({} as any);
    }).toThrowError('Invalid field type undefined');
  });

  it('should throw an error if field type is not in DEFAULT_MAP_COMPONENTS', () => {
    expect(() => {
      component.isValidField({ type: 'invalidType' } as any);
    }).toThrowError('Invalid field type invalidType');
  });

  it('should return true if field type is in DEFAULT_MAP_COMPONENTS', () => {
    expect(component.isValidField({ type: 'input' })).toBe(true);
  });
});
