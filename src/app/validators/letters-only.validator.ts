import { AbstractControl, ValidationErrors } from '@angular/forms';

export function lettersOnlyValidator() {
  return (control: AbstractControl): ValidationErrors | null => {
    const lettersOnly = /^[a-zA-Z]+(?:[-' ]?[a-zA-Z]+)+$/.test(
      control.value || ''
    );
    return lettersOnly ? null : { lettersOnly };
  };
}
