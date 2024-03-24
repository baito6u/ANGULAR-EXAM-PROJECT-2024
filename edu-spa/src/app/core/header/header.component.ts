import { Component } from '@angular/core';
import { retry } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  constructor(private authService: AuthService) {}
  

  get isAuthenticated(): boolean {
    return this.authService.isLoggedIn;
    
  }

  logout() {
    this.authService.SignOut();
  }

}
