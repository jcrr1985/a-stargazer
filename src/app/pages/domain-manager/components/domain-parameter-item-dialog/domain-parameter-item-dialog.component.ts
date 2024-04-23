import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomainItem } from '@models/domain-item.model';
import { Subject } from 'rxjs';

export interface DomainParameterItemDialogData {
  domainItem?: DomainItem | null;
  sequenceId: number;
}

@Component({
  selector: 'app-domain-parameter-item-dialog',
  templateUrl: './domain-parameter-item-dialog.component.html',
  styleUrls: ['./domain-parameter-item-dialog.component.scss'],
})
export class DomainParameterItemDialogComponent implements OnInit, OnDestroy {
  private _onDestroy$ = new Subject<void>();
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<void>,
    @Inject(MAT_DIALOG_DATA) public data: DomainParameterItemDialogData,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      sequence: new FormControl(this.data.sequenceId, [Validators.required]),
      code: new FormControl(),
      isoCode: new FormControl(),
      externalCode: new FormControl(),
      label: new FormControl(),
      extView: new FormControl(false, [Validators.required]),
      externalLabel: new FormControl(),
      status: new FormControl('ACTIVE', [Validators.required]),
    });

    if (this.data.domainItem) {
      this.form.patchValue(this.data.domainItem);
    }
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
  }

  formValueToDomainParameter() {
    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.value;
    const inputDomainItem = this.data.domainItem;

    this.dialogRef.close({
      code: formValue.code,
      externalCode: formValue.externalCode,
      externalLabel: formValue.externalLabel,
      extView: formValue.extView,
      id: inputDomainItem?.id ?? null,
      isModified: true,
      isoCode: formValue.isoCode,
      itemStatus: formValue.status,
      keyCode: inputDomainItem?.keyCode ?? null,
      label: formValue.label,
      name: formValue.label,
      new: !inputDomainItem, // If no domain item is given, we are adding
      sequence: formValue.sequence,
      version: inputDomainItem?.version ?? 0,
      isRemoved: false,
    } as DomainItem);
  }
}
