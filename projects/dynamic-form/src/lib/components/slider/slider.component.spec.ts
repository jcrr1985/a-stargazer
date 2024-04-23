import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { selectElement } from '@testing/dom-testing-utils';
import { DynamicComponentDirective } from '../../directives/dynamic-component.directive';
import { SafeHtmlPipe } from '../../pipe/safe-html/safe-html.pipe';
import { errorControlMessage } from '../../utils/errors/error-control';
import { SliderComponent } from './slider.component';

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SliderComponent, DynamicComponentDirective, SafeHtmlPipe],
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatSliderModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    component.displayWith = component.displayWith.bind(component);
    component.field = {
      type: 'slider',
      name: 'name',
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
    };
    component.control = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the displayWith function', () => {
    const value = 5;
    const result = component.displayWith(value);
    expect(result).toBe(5);
  });

  it('should display the correct label', () => {
    const labelElement = fixture.nativeElement.querySelector('mat-label');
    expect(labelElement.textContent).toEqual('label');
  });

  it('should set the correct initial value', () => {
    const slider = fixture.debugElement.query(
      By.css('mat-slider')
    ).componentInstance;
    expect(slider.value).toBe(0);
  });

  it('should respect the max value', () => {
    const slider = fixture.debugElement.query(
      By.css('mat-slider')
    ).componentInstance;
    expect(slider.max).toBe(100);
  });

  it('should respect the min value', () => {
    const slider = fixture.debugElement.query(
      By.css('mat-slider')
    ).componentInstance;
    expect(slider.min).toBe(0);
  });

  it('should respect the step value', () => {
    const slider = fixture.debugElement.query(
      By.css('mat-slider')
    ).componentInstance;
    expect(slider.step).toBe(1);
  });

  it('should display hintStart correctly', () => {
    const hintElem = selectElement(fixture, '.mat-hint');
    expect(hintElem.textContent?.trim()).toEqual('Start hint text');
  });

  it('should display hintEnd correctly', () => {
    const hintElem = selectElement(fixture, '.mat-form-field-hint-end');
    expect(hintElem.textContent).toEqual('End hint text');
  });

  it('should display vertical slider if vertical is set to true', () => {
    component.field.vertical = true;
    fixture.detectChanges();
    const slider = fixture.debugElement.query(
      By.css('mat-slider')
    ).componentInstance;
    expect(slider.vertical).toBe(true);
  });

  it('should invert the slider if invert is set to true', () => {
    component.field.invert = true;
    fixture.detectChanges();
    const slider = fixture.debugElement.query(
      By.css('mat-slider')
    ).componentInstance;
    expect(slider.invert).toBe(true);
  });

  it('should show thumb label if thumbLabel is set to true', () => {
    component.field.thumbLabel = true;
    fixture.detectChanges();
    const slider = fixture.debugElement.query(
      By.css('mat-slider')
    ).componentInstance;
    expect(slider.thumbLabel).toBe(true);
  });

  it('should use default displayWith function correctly', () => {
    const value = 25;
    expect(component.displayWith(value)).toBe(value);
  });

  it('should use the provided displayWith function from field', () => {
    const mockDisplayWithFn = jasmine
      .createSpy('mockDisplayWithFn')
      .and.returnValue('mockedValue');
    component.field.displayWith = mockDisplayWithFn;
    const value = 25;
    const result = component.displayWith(value);
    expect(mockDisplayWithFn).toHaveBeenCalledWith(value);
    expect(result).toBe('mockedValue');
  });

  it('should display the error message when the control is touched and invalid', waitForAsync(() => {
    component.control.setValidators([Validators.required]);
    component.control.setValue('');
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() => {
        component.control.markAsTouched();
        fixture.detectChanges();
        return fixture.whenStable();
      })
      .then(() => {
        const errorElement = fixture.nativeElement.querySelector('mat-error');
        expect(errorElement).toBeTruthy();
        const expectedErrorMessage = errorControlMessage(component.control);
        expect(errorElement.innerHTML).toContain(expectedErrorMessage);
      });
  }));
});
