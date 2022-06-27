import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable }       from '@angular/core';

enum Theme {
  light = 'light',
  dark = 'dark'
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _currentTheme  = Theme.light;
  private _oppositeTheme = Theme.dark;

  constructor(private readonly _overlayContainer: OverlayContainer) {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme)
      this.currentTheme = savedTheme as Theme;
    else if (this.prefersDark)
      this.currentTheme = Theme.dark;

    this.matchOverlays();
  }

  get currentTheme()  { return this._currentTheme;  }
  get oppositeTheme() { return this._oppositeTheme; }

  get prefersDark()  { return window.matchMedia('prefers-color-scheme: dark').matches; }

  set currentTheme(theme: Theme) {
    this._oppositeTheme = this._currentTheme;
    this._currentTheme = theme;

    localStorage.setItem('theme', theme);
  }

  reverseTheme() {
    this.currentTheme = this.oppositeTheme;
  }

  matchOverlays() {
    const containerElement = this._overlayContainer.getContainerElement();

    containerElement.addEventListener('DOMNodeInserted', () =>
      containerElement.classList.add(this.currentTheme)
    );
  }
}
