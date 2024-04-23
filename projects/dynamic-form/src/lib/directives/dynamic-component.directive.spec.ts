import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormBuilder, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InputComponent } from '../components/input/input.component';
import { DynamicFormComponent } from '../dynamic-form.component';
import { FieldConfiguration } from '../models/models';
import { DynamicComponentDirective } from './dynamic-component.directive';

// Componente de prueba que se utiliza con la directiva
@Component({
  template:
    '<div talanDynamicComponent [component]="dynamicComponent" [inputs]="dynamicComponentInputs"></div>',
})
class TestComponent {
  dynamicComponent: any;
  dynamicComponentInputs: any;
}
@Component({
  template: '<div>Dynamic Content</div>',
})
class MockDynamicComponent {
  field: FieldConfiguration;
  control: AbstractControl | undefined;

  constructor() {
    this.field = { type: 'empty' };
  }
}

describe('DynamicComponentDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let directive: DynamicComponentDirective;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DynamicComponentDirective,
        TestComponent,
        MockDynamicComponent,
      ],
      providers: [FormBuilder],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement.query(
      By.directive(DynamicComponentDirective)
    );
    directive = debugElement.injector.get(DynamicComponentDirective);
    component.dynamicComponent = MockDynamicComponent;
    component.dynamicComponentInputs = {
      field: {
        name: 'testField',
        type: 'input',
        classes: ['testClass'],
      },
    };
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new DynamicComponentDirective(null as any, null as any);
    expect(directive).toBeTruthy();
  });

  it('should compute classes correctly', () => {
    const directive = new DynamicComponentDirective(null as any, null as any);
    const field: FieldConfiguration = {
      name: 'name',
      classes: ['class1', 'class2'],
      type: 'input',
    };
    const index = 1;
    const classes = directive.computeClasses(field, index);
    expect(classes).toEqual([
      'class1',
      'class2',
      'dynamic-form-1',
      'dynamic-form-input',
    ]);
  });

  it('should not assign prototype properties to the component', () => {
    fixture.detectChanges();
    Object.getPrototypeOf(component.dynamicComponentInputs).prototypeProperty =
      'testValue';
    fixture.detectChanges();
    const dynamicComponent: MockDynamicComponent = (
      directive as any
    ).viewContainerRef.get(0).instance;
    expect(dynamicComponent).toBeUndefined();
  });

  it('should create form when fields are set', () => {
    const formBuilder = new FormBuilder();
    const component = new DynamicFormComponent(formBuilder);
    const fields: FieldConfiguration[] = [
      { name: 'field1', type: 'input' },
      { name: 'field2', type: 'select', options: ['option1', 'option2'] },
    ];
    component.fields = fields;
    expect(component.formGroup).toBeTruthy();
    expect(component.formGroup.controls['field1']).toBeTruthy();
    expect(component.formGroup.controls['field2']).toBeTruthy();
  });

  it('should mark all controls as touched', () => {
    const formBuilder = new FormBuilder();
    const component = new DynamicFormComponent(formBuilder);
    component.validators = [];
    component.asyncValidators = [];
    const fields: FieldConfiguration[] = [
      { name: 'field1', type: 'input' },
      { name: 'field2', type: 'select', options: ['option1', 'option2'] },
    ];
    component.fields = fields;
    component.formGroup.markAllAsTouched();
    expect(component.formGroup.get('field1')?.touched).toBeTruthy();
    expect(component.formGroup.get('field2')?.touched).toBeTruthy();
  });

  it('should get the correct component for a field', () => {
    const component = new DynamicFormComponent(null as any);
    const field: FieldConfiguration = { name: 'field1', type: 'input' };
    const componentType = component.getComponent(field);
    expect(componentType).toBe(InputComponent);
  });

  it('should add hidden attribute if field.hidden is true', () => {
    component.dynamicComponentInputs = {
      field: {
        name: 'testField',
        type: 'input',
        classes: ['testClass'],
        hidden: true,
      },
      control: new FormControl('testValue'),
    };
    fixture.detectChanges();
    const nativeElement = (directive as any).nativeElement as HTMLElement;
    expect(nativeElement.getAttribute('hidden')).not.toBeNull();
  });

  it('should remove hidden attribute if field.hidden is false', () => {
    component.dynamicComponentInputs = {
      field: {
        name: 'testField',
        type: 'input',
        classes: ['testClass'],
        hidden: false,
      },
      control: new FormControl('testValue'),
    };
    fixture.detectChanges();
    const nativeElement = (directive as any).nativeElement as HTMLElement;
    expect(nativeElement.getAttribute('hidden')).toBeNull();
  });

  it('should set style correctly when value is provided', () => {
    const el = document.createElement('div');
    (directive as any).setStyle(el, 'width', '100px');
    expect(el.style.width).toEqual('100px');
  });

  it('should split field.classes string into array', () => {
    const directiveInstance = new DynamicComponentDirective(
      null as any,
      null as any
    );
    const field: FieldConfiguration = {
      name: 'testField',
      type: 'input',
      classes: 'class1 class2',
    };
    const result = directiveInstance.computeClasses(field, 1);
    expect(result).toContain('class1');
    expect(result).toContain('class2');
    expect(result).toContain('dynamic-form-1');
    expect(result).toContain('dynamic-form-input');
  });

  it('should handle undefined field.classes', () => {
    const directiveInstance = new DynamicComponentDirective(
      null as any,
      null as any
    );
    const field: FieldConfiguration = {
      name: 'testField',
      type: 'input',
    };
    const result = directiveInstance.computeClasses(field, 1);
    expect(result).toEqual(['dynamic-form-1', 'dynamic-form-input']);
  });

  it('should handle empty string for field.classes', () => {
    const directiveInstance = new DynamicComponentDirective(
      null as any,
      null as any
    );
    const field: FieldConfiguration = {
      name: 'testField',
      type: 'input',
      classes: '',
    };
    const result = directiveInstance.computeClasses(field, 1);
    expect(result).toEqual(['dynamic-form-1', 'dynamic-form-input']);
  });

  it('should not load component if it is undefined', () => {
    (directive as any).viewContainerRef.clear();
    component.dynamicComponent = undefined;
    fixture.detectChanges();
    expect((directive as any).viewContainerRef.length).toBe(0);
  });
});
