import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorDialogComponent } from './dialog/http-error-dialog.component';
import { HttpErrorService } from './service/http-error.service';

@Component({
  selector: 'talan-http-error',
  templateUrl: './http-error.component.html',
  styleUrls: ['./http-error.component.scss'],
})
export class HttpErrorComponent implements OnInit {
  constructor(private dialog: MatDialog, private service: HttpErrorService) {}

  private dialogRef!: MatDialogRef<HttpErrorDialogComponent, string>;

  ngOnInit(): void {
    this.service.message$.subscribe((message: string) => {
      this.openDialog(message);
    });
  }

  openDialog(message: string) {
    this.dialogRef = this.dialog.open(HttpErrorDialogComponent, {
      width: '50%',
      data: message,
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.service.modalAfterClosed(message);
    });
  }
}
