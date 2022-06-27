import { AbstractControl, ValidationErrors } from '@angular/forms';

export function hasUppercaseValidator() {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasUppercase = /[A-Z]+/.test(control.value || '');
    return hasUppercase ? null : { hasUppercase };
  };
}
