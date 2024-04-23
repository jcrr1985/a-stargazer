import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { selectElement } from '@testing/dom-testing-utils';
import { DynamicComponentDirective } from '../../directives/dynamic-component.directive';
import { SafeHtmlPipe } from '../../pipe/safe-html/safe-html.pipe';
import { TextareaComponent } from './textarea.component';

describe('TextareaComponent', () => {
  let component: TextareaComponent;
  let fixture: ComponentFixture<TextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TextareaComponent,
        DynamicComponentDirective,
        SafeHtmlPipe,
      ],
      imports: [ReactiveFormsModule, MatInputModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaComponent);
    component = fixture.componentInstance;
    component.field = {
      type: 'textarea',
      name: 'name',
      label: 'My label',
      hintStart: 'Start hint text',
      hintEnd: 'End hint text',
      placeholder: 'Enter text here',
    };
    component.control = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label correctly', () => {
    const label = fixture.debugElement.query(By.css('mat-label'));
    expect(label.nativeElement.textContent).toBe('My label');
  });

  it('should render the placeholder correctly', () => {
    const inputElement = fixture.nativeElement.querySelector('textarea');
    inputElement.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    const placeholderValue = inputElement.getAttribute('placeholder');
    expect(placeholderValue).toBe('Enter text here');
  });
  it('should display hintStart correctly', () => {
    const hintElem = selectElement(fixture, '.mat-hint');
    expect(hintElem.textContent?.trim()).toEqual('Start hint text');
  });

  it('should display hintEnd correctly', () => {
    const hintElem = selectElement(fixture, '.mat-form-field-hint-end');
    expect(hintElem.textContent).toEqual('End hint text');
  });

  it('should bind rows correctly if provided', () => {
    component.field.rows = 5;
    fixture.detectChanges();
    const textarea = fixture.debugElement.query(
      By.css('textarea')
    ).nativeElement;
    expect(textarea.getAttribute('rows')).toBe('5');
  });

  it('should show error when control is invalid and touched', () => {
    component.control.setValidators([Validators.required]);
    component.control.markAsTouched();
    component.control.setValue('');
    fixture.detectChanges();
    const errorElem = fixture.debugElement.query(By.css('mat-error'));
    expect(errorElem).toBeTruthy();
  });
});
