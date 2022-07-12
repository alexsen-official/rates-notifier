import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators }  from '@angular/forms';
import { ValidationService }        from '../../../services';

@Component({
  selector: 'app-email-field[control]',
  templateUrl: './email-field.component.html',
  styleUrls: ['./email-field.component.scss']
})
export class EmailFieldComponent implements OnInit {
  @Input() control!: FormControl;

  constructor(private readonly _validation: ValidationService) { }

  ngOnInit() {
    this.control.addValidators([
      Validators.required,
      Validators.email
    ]);

    this.control.updateValueAndValidity();
  }

  getError = () => this._validation.getError(this.control, 'Email');
}
