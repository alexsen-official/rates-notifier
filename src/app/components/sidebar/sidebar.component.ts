import { Component } from '@angular/core';

import { SnackbarService, UserService } from '../../services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(
    private readonly _userService: UserService,
    private readonly _snackbarService: SnackbarService
  ) {}

  get token() {
    return this._userService.token;
  }

  logoutUser() {
    this._userService.logout();
    this._snackbarService.open('You have successfully logged out!');
  }
}
