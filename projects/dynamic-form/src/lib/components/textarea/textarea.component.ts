import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TextareaConfiguration } from '../../models/models';
import { errorControlMessage } from '../../utils/errors/error-control';
import { hasRequiredValidator } from '../../utils/validators/has-validator';

@Component({
  selector: 'talan-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent {
  private _field!: TextareaConfiguration;

  get field(): TextareaConfiguration {
    return this._field;
  }

  @Input() set field(value: TextareaConfiguration) {
    this._field = value;
  }

  @Input() control!: FormControl;

  get required() {
    return hasRequiredValidator(this.control);
  }

  constructor() {}

  errorControlMessage = errorControlMessage;
}
