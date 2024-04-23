import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ValidatorFn,
} from '@angular/forms';
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
import {
  AutocompleteConfiguration,
  CheckboxConfiguration,
  DatetimeConfiguration,
  EmptyConfiguration,
  FieldConfiguration,
  InputConfiguration,
  RadioConfiguration,
  SelectConfiguration,
  SliderConfiguration,
  TextareaConfiguration,
  ToggleConfiguration,
} from './models/models';

const DEFAULT_MAP_COMPONENTS = {
  autocomplete: AutocompleteComponent,
  checkbox: CheckboxComponent,
  datetime: DatetimeComponent,
  empty: EmptyComponent,
  input: InputComponent,
  radio: RadioComponent,
  select: SelectComponent,
  slider: SliderComponent,
  textarea: TextareaComponent,
  toggle: ToggleComponent,
};

@Component({
  selector: 'talan-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent {
  /**
   * The root formGroup
   */
  formGroup!: FormGroup;

  /**
   * The form root directive (allow all form abilities)
   *
   * - `form.control` is the root `formGroup`
   * - `form.ngSubmit.emit()` triggers `formSubmit` event
   */
  private _form!: FormGroupDirective;

  @Output() changes = new EventEmitter<FormGroupDirective>();

  @ViewChild(FormGroupDirective) set form(form: FormGroupDirective) {
    this._form = form;
    this.changes.emit(form);
  }

  get form() {
    return this._form;
  }

  // Form submit
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() submit = new EventEmitter<FormGroupDirective>();

  onSubmit() {
    if (this.formGroup.invalid) {
      // validate DOM fields
      this.formGroup.markAllAsTouched();
    } else {
      this.submit.emit(this.form);
    }
  }

  private _preventEnterSubmit = false;

  @Input() set preventEnterSubmit(value: boolean) {
    this._preventEnterSubmit = value;
  }

  get preventEnterSubmit() {
    return this._preventEnterSubmit;
  }

  @Output() enter = new EventEmitter<FormGroupDirective>();

  onEnter() {
    this.enter.emit(this.form);

    if (!this.preventEnterSubmit) {
      this.onSubmit();
    } else {
      if (this.formGroup.invalid) {
        // validate DOM fields
        this.form.control.markAllAsTouched();
      }
    }
  }

  /**
   * The root form updateOn
   *
   * Property order is importamt
   *
   * @example
   * // Error
   * <talan-dynamic-form [fields]="fields" updateOn="blur"></talan-dynamic-form>
   *
   * // Good
   * <talan-dynamic-form updateOn="blur" [fields]="fields"></talan-dynamic-form>
   *
   */
  private _updateOn: 'change' | 'blur' | 'submit' = 'change';

  @Input() set updateOn(value: 'change' | 'blur' | 'submit') {
    this._updateOn = value || 'change';
  }

  get updateOn(): 'change' | 'blur' | 'submit' {
    return this._updateOn;
  }

  /**
   * The root form validators
   *
   * @see ValidatorFn
   */
  private _validators!: ValidatorFn[];

  @Input() set validators(value: ValidatorFn[]) {
    this._validators = value;
  }

  get validators(): ValidatorFn[] {
    return this._validators;
  }

  /**
   * The root form asyncValidators
   *
   * @see AsyncValidatorFn
   */
  private _asyncValidators!: AsyncValidatorFn[];

  set asyncValidators(value: AsyncValidatorFn[]) {
    this._asyncValidators = value;
  }

  get asyncValidators(): AsyncValidatorFn[] {
    return this._asyncValidators;
  }

  /**
   * The root form fields configuration
   *
   * @see FieldConfiguration
   */
  private _fields!: FieldConfiguration[];

  @Input() set fields(value: FieldConfiguration[]) {
    if (!Array.isArray(value)) {
      // value should be an array
      value = [];

      console.warn(
        'Invalid `fields` format, should be an array. `fields` is an empty array now.\nYou should control this warning initializing `fields = []` or use `<talan-dynamic-form *ngIf="fields" [fields]="fields">`'
      );
    }

    value.forEach((field: FieldConfiguration) => {
      this.isValidField(field);
    });

    this._fields = value;

    this.formGroup = this.updateFormGroup();
  }

  get fields(): FieldConfiguration[] {
    return this._fields;
  }

  constructor(private formBuilder: FormBuilder) {}

  /**
   * Create FormGroup with the fields configuration
   *
   * _Note: The 'empty' component has no control_
   */
  private updateFormGroup() {
    const group: { [key: string]: FormControl } = {};

    this.fields.forEach((field) => {
      this.isValidField(field);

      if (field.type === 'empty') {
        // console.warn("'empty' component does not CREATE control");
        return;
      }

      // In the future it will be able to create other AbstractControl --> FormArray & FormGroup inside this.form
      group[field.name] = new FormControl(
        { value: field.value || null, disabled: field.disabled },
        {
          validators: field.validators,
          asyncValidators: field.asyncValidators,
          updateOn: field.updateOn,
        }
      );
    });

    return this.formBuilder.group(group, {
      validators: this.validators,
      asyncValidators: this.asyncValidators,
      updateOn: this.updateOn,
    });
  }

  /**
   * Validates if it is a valid field
   */
  isValidField(field: Pick<FieldConfiguration, 'type'>) {
    if (!field.type || !DEFAULT_MAP_COMPONENTS[field.type]) {
      throw new Error(`Invalid field type ${field.type}`);
    }

    return true;
  }

  /**
   * @returns Component instance
   */
  getComponent(field: FieldConfiguration) {
    this.isValidField(field);

    return DEFAULT_MAP_COMPONENTS[field.type];
  }

  /**
   * Casting FieldConfiguration
   */
  getFieldConfiguration(field: FieldConfiguration) {
    this.isValidField(field);

    if (field.type === 'checkbox') {
      return field as CheckboxConfiguration;
    }

    if (field.type === 'datetime') {
      return field as DatetimeConfiguration;
    }

    if (field.type === 'radio') {
      return field as RadioConfiguration;
    }

    if (field.type === 'input') {
      return field as InputConfiguration;
    }

    if (field.type === 'select') {
      return field as SelectConfiguration;
    }

    if (field.type === 'slider') {
      return field as SliderConfiguration;
    }

    if (field.type === 'textarea') {
      return field as TextareaConfiguration;
    }

    if (field.type === 'toggle') {
      return field as ToggleConfiguration;
    }

    if (field.type === 'autocomplete') {
      return field as AutocompleteConfiguration;
    }

    // 'empty'
    return field as EmptyConfiguration;
  }

  /**
   * Casting FormControl
   */
  getFormControl(field: FieldConfiguration) {
    this.isValidField(field);

    if (field.type === 'empty') {
      // console.warn("'empty' component does not GET control");

      return;
    }

    return this.formGroup.get(field.name) as FormControl;
  }
}
