import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  constructor(private auth: AuthService) {}
  
  get isLoggedIn(): boolean {
    return this.auth.isLogged;
  }

  get userName(): string {
    return this.auth.user?.name || '';
  }

  logout() {
    this.auth.logout();
  }

}
