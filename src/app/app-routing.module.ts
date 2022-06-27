import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  AppComponent,
  LoginComponent,
  RegisterComponent
} from './components';

const routes: Routes = [
  { path: '',         component: AppComponent      },
  { path: 'login',    component: LoginComponent    },
  { path: 'register', component: RegisterComponent },
  { path: '**',       component: AppComponent      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
