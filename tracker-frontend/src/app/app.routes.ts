import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { HomeComponent } from './component/home/home.component';
import { ManageTraineeComponent } from './component/manage-trainee/manage-trainee.component';
import { BatchesPageComponent } from './component/batches-page/batches-page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home',component:HomeComponent},
    {path : 'login',component:LoginComponent},
    {path : 'signup',component:SignupComponent},
    {path : 'managetrainee',component:ManageTraineeComponent},
    {path: 'batches',component:BatchesPageComponent}
];
