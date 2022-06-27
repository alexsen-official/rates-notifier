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

  constructor(private readonly _validationService: ValidationService) { }

  get error() {
    return this._validationService.getError(this.control, 'Password');
  }
}
