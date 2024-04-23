import { AbstractControl } from '@angular/forms';

export function hasRequiredValidator(control: AbstractControl): boolean {
  if (control.validator) {
    const validator = control.validator({} as AbstractControl);

    if (validator && validator.required) {
      return true;
    }
  }

  return false;
}
