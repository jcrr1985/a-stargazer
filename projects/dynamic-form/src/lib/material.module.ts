import { Platform } from '@angular/cdk/platform';
import { Inject, NgModule, Optional } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  NativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  MAT_DATETIME_FORMATS,
  MatDatetimepickerModule,
  MatNativeDatetimeModule,
} from '@mat-datetimepicker/core';

export class CustomDateAdapter extends NativeDateAdapter {
  constructor(
    @Optional() @Inject(MAT_DATE_LOCALE) matDateLocale: string,
    platform: Platform
  ) {
    super(matDateLocale, platform);
  }

  getFirstDayOfWeek(): number {
    return 1;
  }
}

@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatNativeDatetimeModule,
    MatDatetimepickerModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
      deps: [MAT_DATE_LOCALE, Platform],
    },
    {
      provide: MAT_DATETIME_FORMATS,
      useValue: {
        parse: {},
        display: {
          dateInput: {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          },
          monthInput: {
            month: 'long',
          },
          datetimeInput: {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          },
          timeInput: {
            hour: '2-digit',
            minute: '2-digit',
          },
          monthYearLabel: {
            year: 'numeric',
            month: 'short',
          },
          dateA11yLabel: {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          },
          monthYearA11yLabel: {
            year: 'numeric',
            month: 'long',
          },
          popupHeaderDateLabel: {
            weekday: 'short',
            month: 'short',
            day: '2-digit',
          },
        },
      },
    },
  ],
})
export class MaterialModule {}
