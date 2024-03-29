import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { ValidationService } from '../../../services';
import {
  hasLowercaseValidator,
  hasNumericValidator,
  hasUppercaseValidator,
} from '../../../validators';

@Component({
  selector: 'app-password-field[control]',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss'],
})
export class PasswordFieldComponent implements OnInit {
  @Input() control!: FormControl;

  isHidden = true;

  constructor(private readonly _validationService: ValidationService) {}

  get error() {
    return this._validationService.getError(this.control, 'Password');
  }

  ngOnInit() {
    this.control.addValidators([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(32),
      hasUppercaseValidator(),
      hasLowercaseValidator(),
      hasNumericValidator(),
    ]);

    this.control.updateValueAndValidity();
  }
}
