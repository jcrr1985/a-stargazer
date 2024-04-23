import { FormBuilder, Validators } from '@angular/forms';
import { errorControlMessage, getFormValidationErrors } from './error-control';

describe('errorControl', () => {
  let fb: FormBuilder;

  beforeEach(() => {
    fb = new FormBuilder();
  });

  describe('errorControlMessage', () => {
    it('should return minimum length error message', () => {
      const control = fb.control('test', {
        validators: [Validators.minLength(10)],
      });
      const errorMessage = errorControlMessage(control);
      expect(errorMessage).toContain('Min length is');
      expect(errorMessage).toContain('actual length: 4');
    });

    it('should return email error message', () => {
      const control = fb.control('test.com', {
        validators: [Validators.email],
      });
      const errorMessage = errorControlMessage(control);
      expect(errorMessage).toContain('The email "test.com" is not valid');
    });

    it('should return default error message for unknown error', () => {
      const control = fb.control('test', {
        validators: [(ctrl) => ({ unknownError: true })],
      });
      const errorMessage = errorControlMessage(control);
      expect(errorMessage).toEqual('There is an uknown error');
    });

    it('should return max length error message', () => {
      const control = fb.control('testtesttest', {
        validators: [Validators.maxLength(5)],
      });
      const errorMessage = errorControlMessage(control);
      expect(errorMessage).toContain('Max length is 5');
      expect(errorMessage).toContain('actual length: 12');
    });

    it('should return min and max value error message', () => {
      const controlMin = fb.control(3, { validators: [Validators.min(5)] });
      controlMin.setErrors({
        min: {
          requiredLength: 5,
          actualLength: 3,
        },
      });
      const controlMax = fb.control(7, { validators: [Validators.max(5)] });
      controlMax.setErrors({
        max: {
          requiredLength: 5,
          actualLength: 7,
        },
      });
      const errorMessageMin = errorControlMessage(controlMin);
      const errorMessageMax = errorControlMessage(controlMax);
      expect(errorMessageMin).toContain('Minimum value is 5');
      expect(errorMessageMax).toContain('Maximum value is 5');
    });

    it('should return pattern error message', () => {
      const control = fb.control('test', {
        validators: [Validators.pattern('[0-9]+')],
      });
      const errorMessage = errorControlMessage(control);
      expect(errorMessage).toContain('Pattern is not valid');
    });

    it('should log form validation errors', () => {
      const group = fb.group({
        control1: fb.control('test1', { validators: [Validators.required] }),
        control2: fb.control('', { validators: [Validators.required] }),
      });
      const spy = spyOn(console, 'log');
      getFormValidationErrors(group);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(
        'Key control: control2, keyError: required, err value: ',
        true
      );
    });

    it('should handle a missing form control when getting validation errors', () => {
      const group = fb.group({
        control1: fb.control('test1', { validators: [Validators.required] }),
        control2: fb.control('', { validators: [Validators.required] }),
      });
      (group as any).controls.control1 = null;
      const spy = spyOn(console, 'log');
      getFormValidationErrors(group);
      expect(spy).toHaveBeenCalledWith(
        'Key control: control2, keyError: required, err value: ',
        true
      );
      expect(spy).not.toHaveBeenCalledWith(
        jasmine.stringMatching('control1'),
        jasmine.anything()
      );
    });

    it('should return empty string if control is null', () => {
      const errorMessage = errorControlMessage(null as any);
      expect(errorMessage).toBe('');
    });

    it('should return empty string if control has no errors', () => {
      const control = fb.control('some value');
      const errorMessage = errorControlMessage(control);
      expect(errorMessage).toBe('');
    });

    it('should return error message for required', () => {
      const controlReq = fb.control(null, Validators.required);
      const errorMessageReq = errorControlMessage(controlReq);
      expect(errorMessageReq).toBe('Required');
    });

    it('should handle a missing errors property when getting validation errors', () => {
      const controlLikeObject = { value: 'some value' };
      const errorMessage = errorControlMessage(controlLikeObject as any);
      expect(errorMessage).toBe('');
    });
  });
});
