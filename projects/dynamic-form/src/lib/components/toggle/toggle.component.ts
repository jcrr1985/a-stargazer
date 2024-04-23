import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToggleConfiguration } from '../../models/models';
import { errorControlMessage } from '../../utils/errors/error-control';
import { hasRequiredValidator } from '../../utils/validators/has-validator';

@Component({
  selector: 'talan-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent {
  private _field!: ToggleConfiguration;

  get field(): ToggleConfiguration {
    return this._field;
  }

  @Input() set field(value: ToggleConfiguration) {
    this._field = value;
  }

  @Input() control!: FormControl;

  get required() {
    return hasRequiredValidator(this.control);
  }

  constructor() {}

  errorControlMessage = errorControlMessage;
}
