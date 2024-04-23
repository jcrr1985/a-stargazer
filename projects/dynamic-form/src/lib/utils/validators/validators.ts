import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Greater or equal than
 */
export const gte = (value: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (isNaN(+control.value)) {
      return { gte: true, message: `${control.value} isNaN` };
    }

    if (+control.value <= +value) {
      return {
        gte: true,
        message: `${control.value} < ${value}`,
      };
    }

    return null;
  };
};

/**
 * Greater than
 */
export const gt = (value: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (isNaN(+control.value)) {
      return { gte: true, message: `${control.value} isNaN` };
    }

    if (+control.value < +value) {
      return {
        gt: true,
        message: `${control.value} <= ${value}`,
      };
    }

    return null;
  };
};

/**
 * Less or equal than
 */
export const lte = (value: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (isNaN(+control.value)) {
      return { gte: true, message: `${control.value} isNaN` };
    }

    if (+control.value >= +value) {
      return {
        lte: true,
        message: `${control.value} > ${value}`,
      };
    }

    return null;
  };
};

/**
 * Less than
 */
export const lt = (value: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (isNaN(+control.value)) {
      return { gte: true, message: `${control.value} isNaN` };
    }

    if (+control.value > +value) {
      return {
        lt: true,
        message: `${control.value} >= ${value}`,
      };
    }

    return null;
  };
};

/**
 * Equal to
 */
export const eq = (value: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === value) {
      return {
        eq: true,
        message: `${control.value} != ${value}`,
      };
    }

    return null;
  };
};
