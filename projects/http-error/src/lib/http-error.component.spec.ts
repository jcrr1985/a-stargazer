import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { of } from 'rxjs';
import { HttpErrorDialogComponent } from './dialog/http-error-dialog.component';
import { HttpErrorComponent } from './http-error.component';
import { HttpErrorService } from './service/http-error.service';

describe('HttpErrorComponent', () => {
  let component: HttpErrorComponent;
  let fixture: ComponentFixture<HttpErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HttpErrorComponent],
      imports: [MatDialogModule],
      providers: [HttpErrorService, MatDialog],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('add message', fakeAsync(() => {
    spyOn(component['dialog'], 'open').and.returnValue({
      afterClosed: () => of('Test'),
    } as MatDialogRef<HttpErrorDialogComponent>);

    const spy = spyOn(component['service'], 'modalAfterClosed');

    component['service'].message$.subscribe((message) => {
      expect(message).toBe('Test');

      expect(component['dialogRef']).toBeDefined();
      expect(spy).toHaveBeenCalledWith('Test');
    });

    component['service'].add('Test');
  }));
});
