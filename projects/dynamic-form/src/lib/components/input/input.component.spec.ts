import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { selectElement } from '@testing/dom-testing-utils';
import { DynamicComponentDirective } from '../../directives/dynamic-component.directive';
import { SafeHtmlPipe } from '../../pipe/safe-html/safe-html.pipe';
import { errorControlMessage } from '../../utils/errors/error-control';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent, DynamicComponentDirective, SafeHtmlPipe],
      imports: [ReactiveFormsModule, MatInputModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    component.field = {
      label: 'Test Label',
      name: 'testName',
      type: 'input',
      hintStart: 'Start hint text',
      hintEnd: 'End hint text',
      placeholder: 'Test Placeholder',
    };
    component.control = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should capture the input value correctly', () => {
    fixture.detectChanges();
    const inputElem = fixture.nativeElement.querySelector('input');
    inputElem.value = 'test value';
    inputElem.dispatchEvent(new Event('input'));
    expect(component.control.value).toBe('test value');
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
    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    const placeholderValue = inputElement.getAttribute('placeholder');
    expect(placeholderValue).toBe('Test Placeholder');
  });

  it('should have "text" as default type', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement.type).toBe('text');
  });

  it('should show required error message', () => {
    component.control.setValidators([Validators.required]);
    component.control.markAsTouched();
    fixture.detectChanges();
    const errorElement = fixture.nativeElement.querySelector('mat-error');
    const expectedErrorMessage = errorControlMessage(component.control);
    expect(errorElement.innerHTML).toContain(expectedErrorMessage);
  });

  it('should display hintStart correctly', () => {
    const hintElem = selectElement(fixture, '.mat-hint');
    expect(hintElem.textContent).toEqual('Start hint text');
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
