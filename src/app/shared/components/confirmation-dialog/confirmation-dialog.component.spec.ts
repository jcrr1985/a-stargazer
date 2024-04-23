import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { selectElement } from '@testing/dom-testing-utils';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationDialogComponent],
      imports: [
        MatDialogModule,
        MatDividerModule,
        MatButtonModule,
        TranslateTestingModule.withTranslations({ en: {} }),
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    component.data = {
      titleTranslateKey: 'TitleTest',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    const title = selectElement(fixture, '.title span');

    expect(title.innerText).toBe('TitleTest');
  });

  it('should have confirm question', () => {
    const content = selectElement(fixture, '.content h3');

    expect(content.innerText).toBe('wantToContinue');
  });

  it('should have cancel button', () => {
    const cancelButton = selectElement(fixture, '#button-cancel');

    expect(cancelButton).toBeDefined();
  });

  it('should have OK button', () => {
    const okButton = selectElement(fixture, '#button-accept');

    expect(okButton).toBeDefined();
  });
});
