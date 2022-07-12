import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  LoginFormComponent,
  RegisterFormComponent,
  RateTableComponent,
  SubscriptionFormComponent
} from './components';

const routes: Routes = [
  { path: '',          component: RateTableComponent        },
  { path: 'login',     component: LoginFormComponent        },
  { path: 'register',  component: RegisterFormComponent     },
  { path: 'subscribe', component: SubscriptionFormComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
