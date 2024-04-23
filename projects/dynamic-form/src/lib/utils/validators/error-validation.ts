import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

export interface FieldError {
  formGroupName: string;
  fieldName: string;
  errorCode: string;
}

export const fillFormErrors = (
  control: AbstractControl,
  formGroupName: string,
  fieldName: string,
  errors: FieldError[]
) => {
  if (control instanceof FormGroup) {
    Object.keys(control.controls).forEach((controlName) => {
      let formControl = control.get(controlName);
      if (formControl) {
        let fGroupName = formGroupName + '-' + controlName;
        fillFormErrors(formControl, fGroupName, controlName, errors);
      }
    });
  }

  if (control instanceof FormArray) {
    control.controls.forEach((fControl: AbstractControl, index) => {
      let fGroupName = formGroupName + '-' + index;

      fillFormErrors(fControl, fGroupName, 'Array', errors);
    });
  }

  if (control instanceof FormControl) {
    const controlErrors: ValidationErrors | null = control.errors;

    if (controlErrors) {
      Object.keys(controlErrors).forEach((errorCode) => {
        errors.push({
          formGroupName: formGroupName,
          fieldName: fieldName,
          errorCode: errorCode,
        });
      });
    }
  }
};

export const getFormErrors = (
  form: AbstractControl
): ValidationErrors | null => {
  if (form instanceof FormControl) {
    return form.errors;
  } else if (form instanceof FormGroup || form instanceof FormArray) {
    let controlErrors: ValidationErrors = {};

    for (const control of Object.values(form.controls)) {
      controlErrors = {
        ...controlErrors,
        ...getFormErrors(control), // Recursive call of the FormGroup fields
      };
    }

    // Return errors or null
    const errors: ValidationErrors = {
      ...form.errors, // Form group/array can contain errors itself, in that case add them
      ...controlErrors,
    };

    return Object.keys(errors).length > 0 ? errors : null;
  } else {
    return null;
  }
};
