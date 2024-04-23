import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CheckboxConfiguration } from '../../models/models';
import { errorControlMessage } from '../../utils/errors/error-control';
import { hasRequiredValidator } from '../../utils/validators/has-validator';

@Component({
  selector: 'talan-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  private _field!: CheckboxConfiguration;

  get field(): CheckboxConfiguration {
    return this._field;
  }

  @Input() set field(value: CheckboxConfiguration) {
    this._field = value;
  }

  @Input() control!: FormControl;

  get required() {
    return hasRequiredValidator(this.control);
  }

  constructor() {}

  errorControlMessage = errorControlMessage;
}
