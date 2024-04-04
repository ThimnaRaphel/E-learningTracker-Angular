/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/component/login/login.component';
import { BatchesPageComponent } from './app/component/batches-page/batches-page.component';
import { SignupComponent } from './app/component/signup/signup.component';
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
