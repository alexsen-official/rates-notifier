import { Component }                    from '@angular/core';
import { SnackbarService, UserService } from '../../services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private readonly _user: UserService,
              private readonly _snackBar: SnackbarService) { }

  get token() { return this._user.token; }

  logoutUser() {
    this._user.logout();
    this._snackBar.open('You have successfully logged out!');
  }
}
