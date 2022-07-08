import { Component, EventEmitter, Input, Output }     from '@angular/core';
import { SnackbarService, ThemeService, UserService } from '../../services';

@Component({
  selector: 'app-navbar[title]',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input () title!: string;
  @Output() drawerToggle = new EventEmitter();

  constructor(private readonly _snackbar: SnackbarService,
              private readonly _theme   : ThemeService,
              private readonly _user    : UserService) { }

  get oppositeTheme() { return this._theme.oppositeTheme; }
  get token()         { return this._user.token;          }

  reverseTheme = () => this._theme.reverseTheme();

  logoutUser() {
    this._user.logout();
    this._snackbar.open('You have successfully logged out!');
  }
}
