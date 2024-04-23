import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomainParameter } from '@models/domain-parameter.model';
import { Subject } from 'rxjs';

export interface DomainParameterDialogData {
  domainParameter?: DomainParameter | null;
}

@Component({
  selector: 'app-domain-parameter-dialog',
  templateUrl: './domain-parameter-dialog.component.html',
  styleUrls: ['./domain-parameter-dialog.component.scss'],
})
export class DomainParameterDialogComponent implements OnInit, OnDestroy {
  private _onDestroy$ = new Subject<void>();

  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<void>,
    @Inject(MAT_DIALOG_DATA) public data: DomainParameterDialogData,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      groupCode: new FormControl(null, [Validators.required]),
      code: new FormControl(null, [Validators.required]),
      label: new FormControl(null, [Validators.required]),
      externalLabel: new FormControl(),
      domainStatus: new FormControl(null, [Validators.required]),
    });

    if (this.data.domainParameter) {
      this.form.patchValue(this.data.domainParameter);
    }
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
  }

  formValueToDomainParameter(): void {
    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.value;
    const inputDomainParameter = this.data.domainParameter;

    this.dialogRef.close({
      version: inputDomainParameter?.version ?? 0,
      id: inputDomainParameter?.id ?? null,
      keyCode: inputDomainParameter?.keyCode ?? null,
      code: formValue.code,
      label: formValue.label,
      groupCode: formValue.groupCode,
      externalLabel: formValue.externalLabel,
      domainStatus: formValue.domainStatus,
      items: inputDomainParameter?.items ?? [],
      businessKey: inputDomainParameter?.businessKey ?? '',
      new: !inputDomainParameter, // If no domain item is given, we are adding
      isModified: !!inputDomainParameter, // If a domain item is passed, we are editingzz
      isRemoved: false,
    } as DomainParameter);
  }
}
