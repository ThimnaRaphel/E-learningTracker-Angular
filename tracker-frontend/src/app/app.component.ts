import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tracker-frontend';

  constructor(private router: Router) {}
  
  logOut() {
    localStorage.clear();
    this.router.navigate(['/home']);
    console.log("Logged out");
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }
}
