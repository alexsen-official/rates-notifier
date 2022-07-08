import { Injectable }                     from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  readonly config = new MatSnackBarConfig();

  constructor(private readonly _snackbar: MatSnackBar) {
    this.config = {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    };
  }

  open(message: string, action: string = 'Close') {
    this._snackbar.open(message, action, this.config);
  }
}
