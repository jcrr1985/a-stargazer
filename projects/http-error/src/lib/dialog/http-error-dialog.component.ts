import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'talan-http-error-dialog',
  templateUrl: './http-error-dialog.component.html',
  styleUrls: ['./http-error-dialog.component.scss'],
})
export class HttpErrorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<HttpErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string
  ) {}
}
