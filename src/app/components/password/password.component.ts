import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators }  from '@angular/forms';
import { ValidationService }        from '../../services';

import {
  hasLowercaseValidator,
  hasNumericValidator,
  hasUppercaseValidator
} from '../../validators';

@Component({
  selector: 'app-password[control]',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  @Input() control!: FormControl;

  isHidden = true;

  constructor(private readonly _validation: ValidationService) { }

  ngOnInit() {
    this.control.addValidators([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(32),
      hasUppercaseValidator(),
      hasLowercaseValidator(),
      hasNumericValidator()
    ]);

    this.control.updateValueAndValidity();
  }

  getError = () => this._validation.getError(this.control, 'Password');
}
