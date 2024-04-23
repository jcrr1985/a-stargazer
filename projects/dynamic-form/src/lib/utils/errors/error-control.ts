import { AbstractControl, FormGroup } from '@angular/forms';

/**
 * mat-hint & mat-error inside mat-form-field not working
 *
 * It's a Angular Material < 12 bug
 *
 * Instead use this function
 */
export const errorControlMessage = (control: AbstractControl) => {
  if (!control || !control.errors) {
    return '';
  }

  if (control.errors && control.hasError('minlength')) {
    return `Min length is <span class="error-minlength">${control.errors.minlength.requiredLength}</span>, actual length: ${control.errors.minlength.actualLength}`;
  }

  if (control.errors && control.hasError('maxlength')) {
    return `Max length is ${control.errors.maxlength.requiredLength}, actual length: ${control.errors.maxlength.actualLength}`;
  }

  if (control.errors && control.hasError('min')) {
    return `Minimum value is ${control.errors.min.requiredLength}, actual length: ${control.errors.min.actualLength}`;
  }

  if (control.errors && control.hasError('max')) {
    return `Maximum value is ${control.errors.max.requiredLength}, actual length: ${control.errors.max.actualLength}`;
  }

  if (control.errors && control.hasError('email')) {
    return `The email "${control.value}" is not valid`;
  }

  if (control.errors && control.hasError('pattern')) {
    return `Pattern is not valid, required pattern is ${control.errors.pattern.requiredPattern}`;
  }

  if (control.errors && control.hasError('required')) {
    return `Required`;
  }

  return 'There is an uknown error';
};

export const getFormValidationErrors = (form: FormGroup) => {
  Object.keys(form.controls).forEach((key) => {
    const controlErrors = form.get(key)?.errors;

    if (controlErrors) {
      Object.keys(controlErrors).forEach((keyError) => {
        console.log(
          'Key control: ' + key + ', keyError: ' + keyError + ', err value: ',
          controlErrors[keyError]
        );
      });
    }
  });
};
