import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { HomeComponent } from './component/home/home.component';
import { ManageTraineeComponent } from './component/manage-trainee/manage-trainee.component';
export const routes: Routes = [
    {path: 'home',component:HomeComponent},
    {path : 'login',component:LoginComponent},
    {path : 'signup',component:SignupComponent},
    {path : 'managetrainee', component:ManageTraineeComponent}
];
