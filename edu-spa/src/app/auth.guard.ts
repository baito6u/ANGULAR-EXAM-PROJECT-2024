import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './/shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn) {
      return true; // If user is logged in, allow access
    } else {
      // If user is not logged in, redirect to login page
      this.router.navigate(['/login']); // Adjust the route if your login page is different
      return false;
    }
  }
}