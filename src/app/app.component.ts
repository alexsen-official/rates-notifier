import { Component }    from '@angular/core';
import { ThemeService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Rates Notifier';

  constructor(private readonly _themeService: ThemeService) { }

  get currentTheme() { return this._themeService.currentTheme; }
}
