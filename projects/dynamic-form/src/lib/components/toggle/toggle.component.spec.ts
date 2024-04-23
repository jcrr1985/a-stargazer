import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { selectElement } from '@testing/dom-testing-utils';
import { DynamicComponentDirective } from '../../directives/dynamic-component.directive';
import { SafeHtmlPipe } from '../../pipe/safe-html/safe-html.pipe';
import { ToggleComponent } from './toggle.component';

describe('ToggleComponent', () => {
  let component: ToggleComponent;
  let fixture: ComponentFixture<ToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToggleComponent, DynamicComponentDirective, SafeHtmlPipe],
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatSlideToggleModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleComponent);
    component = fixture.componentInstance;
    component.field = {
      type: 'toggle',
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

  it('should display the toggle', () => {
    const toggle = fixture.debugElement.query(By.css('mat-slide-toggle'));
    expect(toggle).toBeTruthy();
  });

  it('should display the label correctly', () => {
    const label = fixture.debugElement.query(
      By.css('mat-slide-toggle')
    ).nativeElement;
    expect(label.textContent.trim()).toBe('My label');
  });

  it('should display hintStart correctly', () => {
    const hintElem = selectElement(fixture, '.mat-hint');
    expect(hintElem.textContent?.trim()).toEqual('Start hint text');
  });

  it('should display hintEnd correctly', () => {
    const hintElem = selectElement(fixture, '.mat-form-field-hint-end');
    expect(hintElem.textContent).toEqual('End hint text');
  });
  it('should show error when control is invalid and touched', () => {
    component.control.setValidators([Validators.required]);
    component.control.markAsTouched();
    component.control.setValue(null);
    fixture.detectChanges();
    const errorElem = fixture.debugElement.query(By.css('mat-error'));
    expect(errorElem).toBeTruthy();
  });

  it('should bind label position correctly if provided', () => {
    component.field.labelPosition = 'before';
    fixture.detectChanges();
    const toggle = selectElement(fixture, 'mat-slide-toggle');
    expect(toggle.getAttribute('ng-reflect-label-position')).toBe('before');
  });
});
