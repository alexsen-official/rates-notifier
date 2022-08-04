import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { ValidationService } from '../../../services';
import { lettersOnlyValidator } from '../../../validators';

@Component({
  selector: 'app-name-field[control]',
  templateUrl: './name-field.component.html',
  styleUrls: ['./name-field.component.scss'],
})
export class NameFieldComponent implements OnInit {
  @Input() control!: FormControl;

  readonly minLength = 5;
  readonly maxLength = 128;

  constructor(private readonly _validationService: ValidationService) {}

  get error() {
    return this._validationService.getError(this.control, 'Name');
  }

  ngOnInit() {
    this.control.addValidators([
      Validators.required,
      Validators.minLength(this.minLength),
      Validators.maxLength(this.maxLength),
      lettersOnlyValidator(),
    ]);

    this.control.updateValueAndValidity();
  }
}
