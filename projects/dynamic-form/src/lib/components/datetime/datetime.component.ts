import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DatetimeConfiguration } from '../../models/models';
import { errorControlMessage } from '../../utils/errors/error-control';
import { hasRequiredValidator } from '../../utils/validators/has-validator';

@Component({
  selector: 'talan-datetime',
  templateUrl: './datetime.component.html',
  styleUrls: ['./datetime.component.scss'],
})
export class DatetimeComponent {
  private _field!: DatetimeConfiguration;

  get field(): DatetimeConfiguration {
    return this._field;
  }

  @Input() set field(value: DatetimeConfiguration) {
    this._field = value;
  }

  @Input() control!: FormControl;

  get required() {
    return hasRequiredValidator(this.control);
  }

  constructor() {}

  errorControlMessage = errorControlMessage;
}
