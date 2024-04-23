import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DiscountType } from '@constants/discount-types';
import { FieldConfiguration } from 'projects/dynamic-form/src/lib/models/models';

@Component({
  selector: 'app-discount-manager-dialog',
  templateUrl: './discount-manager-dialog.component.html',
  styleUrls: ['./discount-manager-dialog.component.scss'],
})
export class DiscountManagerDialogComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<any>();
  form!: FormGroupDirective;
  formDirty = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DiscountManagerDialogComponent>
  ) {}

  fields: FieldConfiguration[] = [];

  ngOnInit(): void {
    this.fields = [
      {
        type: 'checkbox',
        name: 'accumulated',
        disabled: false,
        updateOn: 'change',
        labelPosition: 'before',
        noFormField: false,
        value: true,
      },
      {
        type: 'select',
        name: 'organization',
        label: 'organization',
        options: this.data.organizations,
        value: this.data.organizations[this.data.editedIndex],
        displayWith: (value: any) => value.name,
        compareFn: (o1: any, o2: any) => o1.name === o2.name,
      },

      {
        type: 'select',
        name: 'product',
        label: 'product',
        options: this.data.products,
        value: {},
        displayWith: (value: any) => (value ? value.name : ''),
        compareFn: (o1: any, o2: any) => o1.name === o2.name,
      },

      {
        type: 'select',
        name: 'discountType',
        label: 'discountType',
        options: Object.values(DiscountType),
        value: Object.values(DiscountType)[0],
      },

      {
        type: 'datetime',
        name: 'startDate',
        label: 'startDate',
        value: new Date(this.data.row.startDate.split('/').reverse().join('/')),
      },
      {
        type: 'datetime',
        name: 'endDate',
        label: 'endDate',
        value: new Date(this.data.row.endDate.split('/').reverse().join('/')),
      },

      // offPeakstart
      {
        type: 'datetime',
        name: 'offPeakStart',
        label: 'offPeakStart',
        value: new Date(),
      },
      {
        type: 'datetime',
        name: 'offPeakEnd',
        label: 'offPeakEnd',
        value: new Date(),
      },
      {
        type: 'checkbox',
        name: 'isOssOrigin',
        disabled: false,
        updateOn: 'change',
        labelPosition: 'before',
        noFormField: false,
        value: true,
      },
      {
        type: 'select',
        name: 'isWithAssociatedProduct',
        label: 'isWithAssociatedProduct',
        options: Object.values(isOssOriginAndIsWithAssociatedProduct),
        value: Object.values(isOssOriginAndIsWithAssociatedProduct)[0],
      },
    ];
  }

  formChanges(form: FormGroupDirective) {
    this.form = form;
    this.formDirty = form.dirty || false;
  }

  formSubmit(form: FormGroupDirective) {
    this.dialogRef.close(form.value);
  }

  submit() {
    this.form.ngSubmit.emit();
  }

  closeDialog() {
    if (!this.form.pristine) {
      const confirmResult = window.confirm(
        'You have unsaved changes. Are you sure you want to close the modal?'
      );
      if (confirmResult) {
        this.dialogRef.close();
      }
    } else {
      this.dialogRef.close();
    }
  }
}

// enum DiscountType {
//   percentage = 'PERCENTAGE',
//   fixed = 'FIXED',
// }

enum isOssOriginAndIsWithAssociatedProduct {
  both = 'BOTH',
  yes = 'YES',
  no = 'NO',
}

interface Identifier {
  identifier: string;
  value: boolean;
  type: string;
  privateOperator: boolean;
}
