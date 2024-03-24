import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(public authService: AuthService, public router: Router) {}


  login(email: string, password: string) {
    this.authService.SignIn(email, password);
    

    if(this.email == '') {
      alert('Please enter email');
      return;
    }
    if(this.password == '') {
      alert('Please enter password');
      return;
    }
    
  }
  
}
