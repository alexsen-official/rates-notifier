import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';

@Component({
  selector: 'app-form-actions[form]',
  templateUrl: './form-actions.component.html',
  styleUrls: ['./form-actions.component.scss']
})
export class FormActionsComponent {
  @Input() form!: FormGroup;

  constructor() { }
}
