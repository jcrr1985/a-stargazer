import { Component, Input } from '@angular/core';
import { EmptyConfiguration } from '../../models/models';

@Component({
  selector: 'talan-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
})
export class EmptyComponent {
  private _field!: EmptyConfiguration;

  get field(): EmptyConfiguration {
    return this._field;
  }

  @Input() set field(value: EmptyConfiguration) {
    this._field = value;
  }

  constructor() {}
}
