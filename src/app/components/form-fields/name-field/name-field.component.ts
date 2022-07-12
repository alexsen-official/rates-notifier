import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators }  from '@angular/forms';
import { ValidationService }        from '../../../services';
import { lettersOnlyValidator }     from '../../../validators';

@Component({
  selector: 'app-name-field[control]',
  templateUrl: './name-field.component.html',
  styleUrls: ['./name-field.component.scss']
})
export class NameFieldComponent implements OnInit {
  @Input() control!: FormControl;

  readonly minLength = 5;
  readonly maxLength = 128;

  constructor(private readonly _validation: ValidationService) { }

  ngOnInit() {
    this.control.addValidators([
      Validators.required,
      Validators.minLength(this.minLength),
      Validators.maxLength(this.maxLength),
      lettersOnlyValidator()
    ]);

    this.control.updateValueAndValidity();
  }

  getError = () => this._validation.getError(this.control, 'Name');
}
