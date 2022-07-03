import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  LoginComponent,
  RegisterComponent,
  RateTableComponent
} from './components';

const routes: Routes = [
  { path: '',          component: RateTableComponent },
  { path: 'login',     component: LoginComponent     },
  { path: 'register',  component: RegisterComponent  },
  { path: '**',        component: RateTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
