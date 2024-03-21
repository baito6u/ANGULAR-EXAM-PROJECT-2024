import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router : Router) { }

  // Login Method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then( ()=> {
      localStorage.setItem('token', 'true');
      this.router.navigate(['/profile'])
    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }


  // Register Method
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then( () => {
      alert('Registration Successful');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  // Sign Out
  logout() {
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }
}
