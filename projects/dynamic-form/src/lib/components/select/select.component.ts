import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectConfiguration } from '../../models/models';
import { errorControlMessage } from '../../utils/errors/error-control';
import { hasRequiredValidator } from '../../utils/validators/has-validator';

@Component({
  selector: 'talan-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  private _field!: SelectConfiguration;

  get field(): SelectConfiguration {
    return this._field;
  }

  @Input() set field(value: SelectConfiguration) {
    this._field = value;
  }

  @Input() control!: FormControl;

  get required() {
    return hasRequiredValidator(this.control);
  }

  constructor() {}

  errorControlMessage = errorControlMessage;

  /**
   * Default compare function for flat array
   *
   * Function to compare the option values with the selected values. The first argument is a value from an option. The second is a value from the selection. A boolean should be returned.
   */
  compareFn(option: any, selection: any): boolean {
    return this.field && this.field.compareFn
      ? this.field.compareFn(option, selection)
      : option === selection;
  }

  /**
   * Default display function for flat array
   */
  displayWith(option: string): string {
    return this.field.displayWith ? this.field.displayWith(option) : option;
  }
}
