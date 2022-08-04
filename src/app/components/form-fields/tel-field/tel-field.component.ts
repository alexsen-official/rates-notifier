import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { ValidationService } from '../../../services';
import { numericOnlyValidator } from '../../../validators';

@Component({
  selector: 'app-tel-field[control]',
  templateUrl: './tel-field.component.html',
  styleUrls: ['./tel-field.component.scss'],
})
export class TelFieldComponent implements OnInit {
  @Input() control!: FormControl;

  constructor(private readonly _validationService: ValidationService) {}

  get error() {
    return this._validationService.getError(this.control, 'Phone number');
  }

  ngOnInit() {
    this.control.addValidators([
      Validators.minLength(7),
      Validators.maxLength(15),
      numericOnlyValidator(),
    ]);

    this.control.updateValueAndValidity();
  }
}
