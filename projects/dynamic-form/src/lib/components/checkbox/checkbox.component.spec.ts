import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { selectElement } from '@testing/dom-testing-utils';
import { DynamicComponentDirective } from '../../directives/dynamic-component.directive';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [CheckboxComponent, DynamicComponentDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    component.field = {
      label: 'Test Label',
      name: 'testName',
      type: 'checkbox',
    };
    component.control = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the control label', () => {
    expect(component.field.label).toBe('Test Label');
  });

  it('should set the control value', () => {
    component.control.setValue(true);
    expect(component.control?.value).toBe(true);
  });

  it('should render the placeholder correctly', () => {
    component.field = {
      placeholder: 'Test Placeholder',
      name: 'testName',
      type: 'checkbox',
    };
    fixture.detectChanges();
    const inputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement.placeholder).toBe('Test Placeholder');
  });

  it('should render the label correctly', () => {
    const labelElement = selectElement(
      fixture,
      '.mat-form-field--no-underline'
    );
    expect(labelElement.textContent?.trim()).toEqual('Test Label');
  });
});
