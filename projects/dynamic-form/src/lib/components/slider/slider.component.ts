import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SliderConfiguration } from '../../models/models';
import { errorControlMessage } from '../../utils/errors/error-control';
import { hasRequiredValidator } from '../../utils/validators/has-validator';

@Component({
  selector: 'talan-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent {
  private _field!: SliderConfiguration;

  get field(): SliderConfiguration {
    return this._field;
  }

  @Input() set field(value: SliderConfiguration) {
    this._field = value;
  }

  @Input() control!: FormControl;

  get required() {
    return hasRequiredValidator(this.control);
  }

  constructor() {}

  errorControlMessage = errorControlMessage;

  displayWith(value: number): string | number {
    return this.field && this.field.displayWith
      ? this.field.displayWith(value)
      : value;
  }
}
