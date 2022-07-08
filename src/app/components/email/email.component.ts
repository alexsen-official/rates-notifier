import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators }  from '@angular/forms';
import { ValidationService }        from '../../services';

@Component({
  selector: 'app-email[control]',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
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
