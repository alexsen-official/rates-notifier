import { HttpClientModule }    from '@angular/common/http';
import { NgModule }            from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule }          from '@angular/material/button';
import { MatButtonToggleModule }    from '@angular/material/button-toggle';
import { MatCardModule }            from '@angular/material/card';
import { MatFormFieldModule }       from '@angular/material/form-field';
import { MatIconModule }            from '@angular/material/icon';
import { MatInputModule }           from '@angular/material/input';
import { MatMenuModule }            from '@angular/material/menu';
import { MatPaginatorModule }       from '@angular/material/paginator';
import { MatProgressBarModule }     from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule }         from '@angular/material/sidenav';
import { MatSnackBarModule }        from '@angular/material/snack-bar';
import { MatTableModule }           from '@angular/material/table';
import { MatToolbarModule }         from '@angular/material/toolbar';
import { MatTooltipModule }         from '@angular/material/tooltip';

import { BrowserModule }           from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import {
  AppComponent,
  EmailComponent,
  FormActionsComponent,
  LoginComponent,
  NavbarComponent,
  PasswordComponent,
  RateTableComponent,
  RegisterComponent,
  SidebarComponent,
  SubscriptionComponent
} from './components';

import {
  RateService,
  RequestService,
  SnackbarService,
  SubscriptionService,
  ThemeService,
  UserService,
  ValidationService
} from './services';

@NgModule({
  declarations: [
    AppComponent,
    EmailComponent,
    FormActionsComponent,
    LoginComponent,
    NavbarComponent,
    PasswordComponent,
    RateTableComponent,
    RegisterComponent,
    SidebarComponent,
    SubscriptionComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,

    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule
  ],
  providers: [
    RateService,
    RequestService,
    SnackbarService,
    SubscriptionService,
    ThemeService,
    UserService,
    ValidationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
