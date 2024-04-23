import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import {
  MatCalendarView,
  MatDatetimepickerMode,
  MatDatetimepickerType,
} from '@mat-datetimepicker/core';
import { Observable } from 'rxjs';

export type FieldConfiguration =
  | AutocompleteConfiguration
  | CheckboxConfiguration
  | DatetimeConfiguration
  | EmptyConfiguration
  | InputConfiguration
  | RadioConfiguration
  | SelectConfiguration
  | SliderConfiguration
  | TextareaConfiguration
  | ToggleConfiguration;

export interface EmptyConfiguration extends LibraryConfiguration {
  /**
   * **Library field** type
   */
  type: 'empty';
}

export interface InputConfiguration
  extends ControlConfiguration,
    MaterialConfiguration,
    LibraryConfiguration {
  /**
   * **Library field** type
   */
  type: 'input';

  /**
   * The input type
   *
   * @default 'text'
   */
  inputType?:
    | 'text'
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'time'
    | 'url'
    | 'week';
}

export interface TextareaConfiguration
  extends ControlConfiguration,
    MaterialConfiguration,
    LibraryConfiguration {
  /**
   * **Library field** type
   */
  type: 'textarea';

  /**
   * **Library field** add number of rows to textarea
   */
  rows?: number;
}

export interface SelectConfiguration
  extends ControlConfiguration,
    MaterialConfiguration,
    LibraryConfiguration {
  /**
   * **Library field** type
   */
  type: 'select';

  /**
   * If **Angular Material field** has multiple selection
   *
   * @see value - Use an array when multiple is true
   *
   * @default
   * false
   */
  multiple?: boolean;

  /**
   * The selectable options
   */
  options: any[];

  /**
   * **Library Field** selector compare function
   *
   * Function to compare the option values with the selected values. The first argument is a value from an option. The second is a value from the selection. A boolean should be returned.
   *
   * @default
   * compareFn(option: any, selection: any): boolean {
   *   return option === selection;
   * }
   */
  compareFn?: (option: any, selection: any) => boolean;

  /**
   * **Library Field** how to selector display option
   *
   * @default
   * displayWith(option: string): string {
   *   return option;
   * }
   */
  displayWith?: (option: any) => string;
}

export interface AutocompleteConfiguration
  extends ControlConfiguration,
    Omit<MaterialConfiguration, 'hintStart'>,
    LibraryConfiguration {
  /**
   * **Library field** type
   */
  type: 'autocomplete';

  /**
   * If **Angular Material field** has multiple selection
   *
   * @see value - Use an array when multiple is true
   *
   * @default
   * false
   */
  multiple?: boolean;

  /**
   * The API method
   *
   * @param value the search param
   */
  apiMethod: (value: string) => Observable<any[]>;

  /**
   * @example
   * 'Málaga, Sevilla and 2 more'
   *
   * @default
   * 2
   */
  showMoreMessageItems?: number;

  /**
   * Minimum input length to execute apiMethod
   *
   * When minlength is -1 execute on init
   *
   * @default
   * -1
   */
  minlength?: number;

  /**
   * Input value star with
   *
   * @default
   * ''
   */
  startWith?: string;

  /**
   * Input debounce time
   *
   * @default
   * 300
   */
  debounceTime?: number;

  /**
   * Function that will be used to format the value before it is displayed in the thumb label
   *
   * @default
   * displayWith(value: any) => string {
   *  return value;
   * }
   */
  displayWith?: (value: any) => string;
}

export interface CheckboxConfiguration
  extends ControlConfiguration,
    MaterialConfiguration,
    LibraryConfiguration {
  /**
   * **Library field** type
   */
  type: 'checkbox';

  /**
   * The **Angular Material field** label
   *
   * Use it if you don't use "placeholder"
   */
  label?: string;

  /**
   * The **Angular Material field** placeholder
   *
   * Use it if you don't use "label"
   */
  placeholder?: string;

  /**
   * Whether the label should appear after or before the slide-toggle.
   *
   * @default
   * 'after'
   */
  labelPosition?: 'before' | 'after';
}

export interface ToggleConfiguration
  extends ControlConfiguration,
    MaterialConfiguration,
    LibraryConfiguration {
  /**
   * **Library field** type
   */
  type: 'toggle';

  /**
   * Whether the label should appear after or before the slide-toggle.
   *
   * @default
   * 'after'
   */
  labelPosition?: 'before' | 'after';
}

/**
 * @see https://github.com/kuhnroyal/mat-datetimepicker/tree/v6.0.3
 */
export interface DatetimeConfiguration
  extends ControlConfiguration,
    MaterialConfiguration,
    LibraryConfiguration {
  /**
   * **Library field** type
   */
  type: 'datetime';

  /**
   * **Library field** picker type
   *
   * @default 'date'
   */
  pickerType?: MatDatetimepickerType;

  /**
   * **Library field** type multiYearSelector
   *
   * @default false
   */
  multiYearSelector?: boolean;

  /**
   * **Library field** type twelvehour
   *
   * @default false
   */
  twelvehour?: boolean;

  /**
   * **Library field** type startView
   *
   * @default 'month'
   */
  startView?: MatCalendarView;

  /**
   * **Library field** type mode
   *
   * @default 'auto'
   */
  mode?: MatDatetimepickerMode;

  /**
   * **Library field** type timeInterval
   *
   * @default 1
   */
  timeInterval?: number;

  /**
   * @default 'Next month'
   */
  ariaNextMonthLabel?: string;

  /**
   * @default 'Previous month'
   */
  ariaPrevMonthLabel?: string;

  /**
   * @default 'Next year'
   */
  ariaNextYearLabel?: string;

  /**
   * @default 'Previous year'
   */
  ariaPrevYearLabel?: string;

  /**
   * **Library field** type preventSameDateTimeSelection
   *
   * @default false
   */
  preventSameDateTimeSelection?: boolean;

  /**
   * Custom class
   */
  panelClass?: string | string[];

  /**
   * Valid formats
   * - new Date();
   * - '2022-06-25'
   * - 1695292894152
   *
   */
  startAt?: Date | string | number;

  /**
   * **Library field** type openOnFocus
   *
   * @default true
   */
  openOnFocus?: boolean;
}

export interface RadioConfiguration
  extends ControlConfiguration,
    MaterialConfiguration,
    LibraryConfiguration {
  /**
   * **Library field** type
   */
  type: 'radio';

  /**
   * The radio options
   */
  options: TextValue[];

  /**
   * Whether the label should appear after or before the slide-toggle.
   *
   * @default
   * 'after'
   */
  labelPosition?: 'before' | 'after';
}

export interface SliderConfiguration
  extends ControlConfiguration,
    MaterialConfiguration,
    LibraryConfiguration {
  /**
   * **Library field** type
   */
  type: 'slider';

  /**
   * The maximum value that the slider can have.
   */
  max: number;

  /**
   * The minimum value that the slider can have.
   */
  min: number;

  /**
   * The values at which the thumb will snap.
   */
  step: number;

  /**
   * How often to show ticks. Relative to the step so that a tick always appears on a step. Ex: Tick interval of 4 with a step of 3 will draw a tick every 4 steps (every 12 values).
   */
  tickInterval?: number | 'auto';

  /**
   * Whether the slider is vertical.
   */
  vertical?: boolean;

  /**
   * Whether the slider is inverted.
   */
  invert?: boolean;

  /**
   * Whether or not to show the thumb label.
   */
  thumbLabel?: boolean;

  /**
   * Function that will be used to format the value before it is displayed in the thumb label
   *
   * @default
   * displayWith(value: number): string | number {
   *  return value;
   * }
   */
  displayWith?: (value: number) => string | number;
}

// Common Models

export interface ControlConfiguration {
  /**
   * The **field control** type
   *
   * @default 'FormControl'
   */
  controlType?: 'FormControl' | 'FormArray' | 'FormGroup';

  /**
   * The **field control** name
   */
  name: string;

  /**
   * The **field control** value
   *
   * @default undefined
   */
  value?: any;

  /**
   * The **field control** disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * The **field control** validators
   */
  validators?: ValidatorFn | ValidatorFn[];

  /**
   * The **field control** async validators
   */
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[];

  /**
   * The **field control** updateOn
   *
   * @default 'blur'
   */
  updateOn?: 'change' | 'blur' | 'submit';
}

export interface MaterialConfiguration {
  /**
   * The **Angular Material field** form-field appearance
   */
  appearance?: MatFormFieldAppearance;

  /**
   * The **Angular Material field** form-field hide required marker
   */
  hideRequiredMarker?: boolean;

  /**
   * The **Angular Material field** field label
   */
  label?: string;

  /**
   * The **Angular Material field** field placeholder
   */
  placeholder?: string;

  /**
   * The **Angular Material field** field start hint
   */
  hintStart?: string;

  /**
   * The **Angular Material field** field end hint
   */
  hintEnd?: string;
}

export interface LibraryConfiguration {
  /**
   * The **Library field** if hide field component
   */
  hidden?: boolean;

  /**
   * The **Library field** field CSS width
   *
   * @example
   * '20%', '200px'
   */
  width?: string;

  /**
   * The **Library field** classes
   */
  classes?: string | string[];

  /**
   * Don't use `mat-form-field` in:
   *
   * - `mat-checkbox`
   * - `radio`
   * - `slider`
   * - `toggle`
   */
  noFormField?: boolean;
}

// Extra Models

export interface TextValue {
  value: any;
  // TODO: translate
  text: string;
}
