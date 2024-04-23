import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateGreaterThan(dateToCompare: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dateToCompareValue = control.parent?.get(dateToCompare)?.value;

    if (
      dateToCompareValue &&
      control.value &&
      dateToCompareValue > control.value
    ) {
      return {
        dateGreaterThan: {
          message: `Date should be greater than ${dateToCompareValue}`,
        },
      };
    }

    return null;
  };
}
