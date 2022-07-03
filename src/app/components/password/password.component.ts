import { Component, Input }  from '@angular/core';
import { FormControl }       from '@angular/forms';
import { ValidationService } from '../../services';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent {
  @Input() control!: FormControl;

  isHidden = true;

  constructor(private readonly _validation: ValidationService) { }

  getError = () =>
    this._validation.getError(this.control, 'Password');
}
