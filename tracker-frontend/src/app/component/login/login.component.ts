import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../authentication-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule,],
  providers:[AuthenticationService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent {
  loginForm!: FormGroup;
  submitted = false;
  common = '';

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          // Validators.pattern(
          //   /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
          // ),
        ],
      ],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.common = '';
    if (this.loginForm.valid) {
      const { email, password, userName } = this.loginForm.value;
      this.authenticationService
        .userLogin({ email, password })
        .subscribe(
          (data) => {
            if (data.success) {
              localStorage.setItem('access_token', data.token);
              localStorage.setItem('refresh_token', data.refreshToken);
              this.router.navigate(['/messages']);
              console.log("token",data.token);
            }
          },
          ({ error }) => {
            this.common = error.message;
          }
        );
    }
  }
}
