import { AbstractControl, ValidationErrors } from '@angular/forms';

export function numericOnlyValidator() {
  return (control: AbstractControl): ValidationErrors | null => {
    const numericOnly = /^\d*$/.test(control.value || '');
    return numericOnly ? null : { numericOnly };
  };
}
