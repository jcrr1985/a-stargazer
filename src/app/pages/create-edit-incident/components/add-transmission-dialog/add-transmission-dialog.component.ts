import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TransmissionLightDTO } from '@models/transmission-light-dto.model';
import { TransmissionsService } from '@services/transmissions/transmissions.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-transmission-dialog',
  templateUrl: './add-transmission-dialog.component.html',
  styleUrls: ['./add-transmission-dialog.component.scss'],
})
export class AddTransmissionDialogComponent implements OnDestroy {
  private _onDestroy$ = new Subject<void>();
  autocompleteControl = new FormControl();
  filteredOptions: TransmissionLightDTO[] = [];
  selected?: TransmissionLightDTO;
  loading = false;
  error = false;

  constructor(
    public dialogRef: MatDialogRef<void>,
    readonly transmissionsService: TransmissionsService
  ) {}

  getFilteredTransmissions = (query: string) =>
    this.transmissionsService.getFilteredTransmissions(query);

  getTransmissionDisplayValue(option: TransmissionLightDTO) {
    if (!option) {
      return '';
    }

    let displayValue = option.no;

    if (option.title) {
      displayValue += ` - ${option.title}`;
    }
    return displayValue;
  }

  setOptionSelected(option: TransmissionLightDTO) {
    this.selected = option;
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
  }
}
