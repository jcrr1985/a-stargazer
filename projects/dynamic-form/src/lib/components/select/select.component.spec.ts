import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { selectElement } from '@testing/dom-testing-utils';
import { DynamicComponentDirective } from '../../directives/dynamic-component.directive';
import { SafeHtmlPipe } from '../../pipe/safe-html/safe-html.pipe';
import { errorControlMessage } from '../../utils/errors/error-control';
import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectComponent, DynamicComponentDirective, SafeHtmlPipe],
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatSelectModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    component.field = {
      type: 'select',
      options: ['option1', 'option2'],
      name: 'name',
      label: 'label',
      hintEnd: 'End hint text',
      hintStart: 'Start hint text',
      placeholder: 'Test Placeholder',
      multiple: false,
    };
    component;
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
    expect(component.field.label).toBe('label');
  });

  it('should set the control value', () => {
    component.control.setValue('test');
    expect(component.control?.value).toBe('test');
  });

  it('should render the label correctly', () => {
    const labelElement = fixture.nativeElement.querySelector('mat-label');
    expect(labelElement.textContent).toEqual('label');
  });

  it('should show required error message', waitForAsync(() => {
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

  it('should not allow multiple selections when multiple is false', () => {
    component.control.setValue('option1');
    fixture.detectChanges();
    component.control.setValue('option2');
    fixture.detectChanges();
    expect(component.control.value).toEqual('option2');
  });

  it('should set the appearance correctly', () => {
    component.field.appearance = 'fill';
    fixture.detectChanges();
    const matFormFieldDebugElem = fixture.debugElement.query(
      By.css('mat-form-field')
    );
    const matFormFieldInstance = matFormFieldDebugElem.componentInstance;
    expect(matFormFieldInstance.appearance).toBe('fill');
  });

  it('should hide the required marker', () => {
    component.field.hideRequiredMarker = true;
    fixture.detectChanges();
    const matFormFieldDebugElem = fixture.debugElement.query(
      By.css('mat-form-field')
    );
    const matFormFieldInstance = matFormFieldDebugElem.componentInstance;
    expect(matFormFieldInstance.hideRequiredMarker).toBe(true);
  });

  it('should set the placeholder correctly', () => {
    const placeholder = selectElement(fixture, 'mat-select');
    expect(placeholder.textContent).toBe('Test Placeholder');
  });

  it('should not have a placeholder if not provided', () => {
    component.field.placeholder = undefined;
    fixture.detectChanges();
    const matSelectElem = fixture.nativeElement.querySelector('mat-select');
    expect(matSelectElem.getAttribute('placeholder')).toBeFalsy();
  });

  it('should use the default compareFn correctly', () => {
    const option = 'option1';
    const selection = 'option1';
    expect(component.compareFn(option, selection)).toBe(true);
  });

  it('should use the provided displayWith function from field', () => {
    const mockDisplayWithFn = jasmine
      .createSpy('mockDisplayWithFn')
      .and.returnValue('mockedValue');
    component.field.displayWith = mockDisplayWithFn;
    const option = 'option1';
    const result = component.displayWith(option);
    expect(mockDisplayWithFn).toHaveBeenCalledWith(option);
    expect(result).toBe('mockedValue');
  });

  it('should use the default displaywith correctly', () => {
    const option = 'option1';
    expect(component.displayWith(option)).toBe('option1');
  });

  it('should use the provided compareFn from field', () => {
    const mockCompareFn = jasmine
      .createSpy('mockCompareFn')
      .and.callFake((option: any, selection: any) => option === selection);
    component.field.compareFn = mockCompareFn;
    const option = 'option1';
    const selection = 'option1';

    const result = component.compareFn(option, selection);

    expect(mockCompareFn).toHaveBeenCalledWith(option, selection);
    expect(result).toBe(true);
  });
});
