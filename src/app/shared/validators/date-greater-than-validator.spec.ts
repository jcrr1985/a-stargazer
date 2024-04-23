import { FormControl, FormGroup } from '@angular/forms';
import { dateGreaterThan } from './date-greater-than-validator';

describe('dateGreaterThan', () => {
  it('should not return error if end date is greater than start date', () => {
    const form = new FormGroup({
      startDate: new FormControl(new Date('2023-10-25T10:00:00Z')),
      endDate: new FormControl(new Date('2023-10-26T10:00:00Z'), [
        dateGreaterThan('startDate'),
      ]),
    });

    expect(form.get('endDate')?.errors).toBeNull();
  });

  it('should return error if end date is less than start date', () => {
    const formGroup = new FormGroup({
      startDate: new FormControl(new Date('2023-10-26T10:00:00Z')),
      endDate: new FormControl(new Date('2023-10-25T10:00:00Z')),
    });
    formGroup.get('endDate')?.setValidators(dateGreaterThan('startDate'));
    formGroup.get('endDate')?.updateValueAndValidity();

    expect(formGroup.get('endDate')?.errors).toEqual({
      dateGreaterThan: {
        message: `Date should be greater than ${
          formGroup.get('startDate')?.value
        }`,
      },
    });
  });

  it('should not return error if end date or start date is not set', () => {
    const form = new FormGroup({
      startDate: new FormControl(null),
      endDate: new FormControl(new Date('2023-10-26T10:00:00Z'), [
        dateGreaterThan('startDate'),
      ]),
    });

    expect(form.get('endDate')?.errors).toBeNull();
  });
});
