import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { ValidationService } from '../../../services';

@Component({
  selector: 'app-email-field[control]',
  templateUrl: './email-field.component.html',
  styleUrls: ['./email-field.component.scss'],
})
export class EmailFieldComponent implements OnInit {
  @Input() control!: FormControl;

  constructor(private readonly _validationService: ValidationService) {}

  get error() {
    return this._validationService.getError(this.control, 'Email');
  }

  ngOnInit() {
    this.control.addValidators([Validators.required, Validators.email]);

    this.control.updateValueAndValidity();
  }
}
