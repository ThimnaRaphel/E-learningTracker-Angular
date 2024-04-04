import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication-service.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, HttpClientModule],
  providers : [AuthenticationService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm!: FormGroup;
  submitted = false;
  common = '';
  wrongPassword : boolean= false;
  accountCreated : boolean  = false;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required]],
      password: ['',[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/),],],
      confirm_password: ['',[Validators.required]],
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log("Submit Clicked");
    this.common = '';
    if (this.signupForm.valid) {

      const { email, password, userName, confirm_password } = this.signupForm.value;
      console.log(email, password, userName,confirm_password);
      if(password === confirm_password)
      {
          const user_name = userName;
          const role_id = 101;
          const jwt_decoded = 'decoded';
          // const jwt_decoded = localStorage.getItem('access_token');
          this.authenticationService
          .userSignUp({ email, password, user_name, role_id, jwt_decoded })
          .subscribe(
            (data) => {
              if (data.user_id) {
                // localStorage.setItem('access_token', data.token);
                // localStorage.setItem('refresh_token', data.refreshToken);
                // this.router.navigate(['/']);
                console.log("Successss");
                this.accountCreated=true;
                setTimeout(() => {
                  this.accountCreated=false;
                  location.reload();
                }, 2000);
                this.submitted = false;
              }
            },
            ({ error }) => {
              this.common = error.message;
            }
          );
        }
        else 
        {
          this.wrongPassword=true;
          setTimeout(() => {
            this.wrongPassword=false;
          }, 2000);
          this.submitted = false;
        }
    }
  }
}
