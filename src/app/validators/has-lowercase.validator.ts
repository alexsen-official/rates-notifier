import { AbstractControl, ValidationErrors } from '@angular/forms';

export function hasLowercaseValidator() {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasLowercase = /[a-z]+/.test(control.value || '');
    return hasLowercase ? null : { hasLowercase };
  };
}
