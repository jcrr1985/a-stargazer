import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DATEPICKER_SCROLL_STRATEGY } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatDatetimepickerModule,
  MatNativeDatetimeModule,
} from '@mat-datetimepicker/core';
import { DynamicComponentDirective } from '../../directives/dynamic-component.directive';
import { SetDateOnKeyPressDirective } from '../../directives/set-date-on-key-press.directive';
import { SafeHtmlPipe } from '../../pipe/safe-html/safe-html.pipe';
import { errorControlMessage } from '../../utils/errors/error-control';
import { DatetimeComponent } from './datetime.component';

describe('DatetimeComponent', () => {
  let component: DatetimeComponent;
  let fixture: ComponentFixture<DatetimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatDatetimepickerModule,
        MatFormFieldModule,
        OverlayModule,
        MatInputModule,
        MatNativeDatetimeModule,
        BrowserAnimationsModule,
      ],
      declarations: [
        DatetimeComponent,
        DynamicComponentDirective,
        SetDateOnKeyPressDirective,
        SafeHtmlPipe,
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
    fixture = TestBed.createComponent(DatetimeComponent);
    component = fixture.componentInstance;
    component.field = {
      label: 'Test Label',
      name: 'testName',
      type: 'datetime',
      pickerType: 'datetime',
      multiYearSelector: false,
      twelvehour: false,
      startView: 'month',
      mode: 'auto',
      timeInterval: 1,
      ariaNextMonthLabel: 'Next month',
      ariaPrevMonthLabel: 'Previous month',
      ariaNextYearLabel: 'Next year',
      ariaPrevYearLabel: 'Previous year',
      preventSameDateTimeSelection: false,
      panelClass: '',
      startAt: new Date(),
      openOnFocus: true,
    };
    component.control = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a label', () => {
    expect(component.field.label).toBe('Test Label');
  });

  it('should set the control name', () => {
    expect(component.field.name).toBe('testName');
  });

  it('should have an input field', () => {
    const input = fixture.nativeElement.querySelector('input');
    expect(input).toBeTruthy();
  });

  it('should set the control value', () => {
    const now = new Date();
    component.control.setValue(now);
    expect(component.control?.value).toEqual(now);
  });

  it('should update the control value when the input value changes', () => {
    const input = fixture.nativeElement.querySelector('input');
    input.value = '2022-01-01T12:00:00';
    input.dispatchEvent(new Event('input'));
    expect(component.control.value).toEqual(new Date('2022-01-01T12:00:00'));
  });

  it('should show required error message', () => {
    component.control.setValidators([Validators.required]);
    component.control.markAsTouched();
    fixture.detectChanges();
    const errorElement = fixture.nativeElement.querySelector('mat-error');
    const expectedErrorMessage = errorControlMessage(component.control);
    expect(errorElement.innerHTML).toContain(expectedErrorMessage);
  });
});
