import { Component, Input } from '@angular/core';

import {
  SnackbarService,
  ThemeService,
  UserService
} from '../../services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() title!: string;

  constructor(private readonly _snackbar: SnackbarService,
              private readonly _theme  : ThemeService,
              private readonly _user   : UserService) { }

  get oppositeTheme() { return this._theme.oppositeTheme; }
  get token()         { return this._user.token;          }

  reverseTheme = () =>
    this._theme.reverseTheme();

  logoutUser() {
    this._user.logout();
    this._snackbar.open('You have successfully logged out!');
  }
}
