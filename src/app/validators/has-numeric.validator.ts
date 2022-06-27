import { AbstractControl, ValidationErrors } from '@angular/forms';

export function hasNumericValidator() {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasNumeric = /\d+/.test(control.value || '');
    return hasNumeric ? null : { hasNumeric };
  };
}
