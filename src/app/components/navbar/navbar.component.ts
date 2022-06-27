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

  constructor(private readonly _snackbarService: SnackbarService,
              private readonly _themeService: ThemeService,
              private readonly _userService: UserService) { }

  get oppositeTheme() { return this._themeService.oppositeTheme; }
  get token()         { return this._userService.token;}

  reverseTheme = () => this._themeService.reverseTheme();

  logoutUser() {
    this._userService.logout();
    this._snackbarService.open('You have successfully logged out!');
  }
}
