import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { environment } from '@environment';
import { Observable, of } from 'rxjs';

export const gteAsync = (http: HttpClient): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return http
      .get<boolean>(`${environment.baseUrl}/?value=${control.value}`)
      .pipe(
        map((value: boolean) => {
          if (value) {
            return { gteAsync: true };
          }

          return null;
        }),
        catchError((err: any) => {
          return err.status === 404 ? of(null) : of({ gteAsync: true });
        })
      );
  };
};
