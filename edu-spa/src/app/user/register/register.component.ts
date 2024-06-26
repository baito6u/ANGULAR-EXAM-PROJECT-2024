import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    
  }

  register() {
    if(this.email == '') {
      alert('Please enter email');
      return;
    
    }
    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    this.authService.SignUp(this.email, this.password);
    this.email = '';
    this.password = '';
  }

}
