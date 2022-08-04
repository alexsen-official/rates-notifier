import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  getError(control: FormControl, label: string = 'This field') {
    const errors = control.errors;

    if (errors && control.touched) {
      const firstError = Object.keys(errors.valueOf())[0];

      switch (firstError) {
        case 'email':
          return `${label} is incorrect!`;

        case 'pattern':
          return `${label} has wrong pattern!`;

        case 'minlength':
          return `${label} must contain at least ${
            control.getError('minlength')['requiredLength']
          } characters!`;

        case 'maxlength':
          return `${label} must not be longer than ${
            control.getError('maxlength')['requiredLength']
          } characters!`;

        case 'min':
          return `${label} cannot be less than ${
            control.getError('min')['min']
          }!`;

        case 'max':
          return `${label} cannot be greater than ${
            control.getError('max')['max']
          }!`;

        case 'hasUppercase':
          return `${label} must contain uppercase characters!`;

        case 'hasLowercase':
          return `${label} must contain lowercase characters!`;

        case 'hasNumeric':
          return `${label} must contain numeric characters!`;

        case 'lettersOnly':
          return `${label} must contain only latin letters!`;

        case 'numericOnly':
          return `${label} must contain only numeric characters!`;

        default:
          return `${label} is required!`;
      }
    }

    return null;
  }
}
