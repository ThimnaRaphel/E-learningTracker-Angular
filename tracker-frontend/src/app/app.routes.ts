import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { HomeComponent } from './component/home/home.component';
import { BatchesPageComponent } from './component/batches-page/batches-page.component';

export const routes: Routes = [
    {path: 'home',component:HomeComponent},
    {path : 'login',component:LoginComponent},
    {path : 'signup',component:SignupComponent},
    {path : 'batches',component:BatchesPageComponent}
];
