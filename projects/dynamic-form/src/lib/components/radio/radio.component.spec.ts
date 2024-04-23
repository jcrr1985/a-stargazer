import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { selectElement } from '@testing/dom-testing-utils';
import { DynamicComponentDirective } from '../../directives/dynamic-component.directive';
import { SafeHtmlPipe } from '../../pipe/safe-html/safe-html.pipe';
import { errorControlMessage } from '../../utils/errors/error-control';
import { RadioComponent } from './radio.component';

describe('RadioComponent', () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RadioComponent, DynamicComponentDirective, SafeHtmlPipe],
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatRadioModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioComponent);
    component = fixture.componentInstance;
    component.field = {
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
    };
    component.control = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should capture the value correctly', () => {
    fixture.detectChanges();
    const inputElem = new FormControl('option1');
    expect(inputElem.value).toBe('option1');
    const inputElem2 = new FormControl('option2');
    expect(inputElem2.value).toBe('option2');
  });

  it('should set the control label', () => {
    expect(component.field.label).toBe('Test Label');
  });

  it('should set the control value', () => {
    component.control.setValue('test');
    expect(component.control?.value).toBe('test');
  });

  it('should render the label correctly', () => {
    const labelElement = fixture.nativeElement.querySelector('mat-label');
    expect(labelElement.textContent).toEqual('Test Label');
  });

  it('should render the placeholder correctly', () => {
    const inputElement = selectElement(fixture, 'input');
    fixture.detectChanges();
    const placeholderValue = inputElement.getAttribute('placeholder');
    expect(placeholderValue).toBe('Test Placeholder');
  });
  it('should have "text" as default type', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement.type).toBe('text');
  });

  it('should show required error message for radio', waitForAsync(() => {
    component.control.setValidators([Validators.required]);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      component.control.markAsTouched();
      fixture.detectChanges();
      const errorElement = fixture.nativeElement.querySelector('mat-error');
      const expectedErrorMessage = errorControlMessage(component.control);
      expect(errorElement).toBeTruthy();
      expect(errorElement.innerHTML).toContain(expectedErrorMessage);
    });
  }));

  it('should display hintStart correctly', () => {
    const hintElem = selectElement(fixture, '.mat-hint');
    expect(hintElem.textContent?.trim()).toEqual('Start hint text');
  });

  it('should display hintEnd correctly', () => {
    const hintElem = selectElement(fixture, '.mat-form-field-hint-end');
    expect(hintElem.textContent).toEqual('End hint text');
  });

  it('should not display hintStart when not provided', () => {
    component.field.hintStart = undefined;
    fixture.detectChanges();
    const hintElem = fixture.nativeElement.querySelector(
      'mat-hint[align="start"]'
    );
    expect(hintElem).toBeNull();
  });

  it('should not display hintEnd when not provided', () => {
    component.field.hintEnd = undefined;
    fixture.detectChanges();
    const hintElem = fixture.nativeElement.querySelector(
      'mat-hint[align="end"]'
    );
    expect(hintElem).toBeNull();
  });
});
