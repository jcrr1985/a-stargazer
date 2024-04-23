import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogModule } from '@angular/material/dialog';
import { DiscountManagerDialogComponent } from './discount-manager-dialog.component';

describe('DiscountManagerDialogComponent', () => {
  let component: DiscountManagerDialogComponent;
  let fixture: ComponentFixture<DiscountManagerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscountManagerDialogComponent, MatDialogModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountManagerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
