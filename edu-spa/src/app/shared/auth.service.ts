import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from './types/user-type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User | undefined;
  USER_KEY = '[user]';

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private fireauth : AngularFireAuth, private router : Router) { 
    try {
      const lsUser = localStorage.getItem(this.USER_KEY) || '';
    this.user = JSON.parse(lsUser);
    } catch (error) {
      this.user = undefined;
    }
  }


  // Login Method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then( ()=> {
      localStorage.setItem(this.USER_KEY, JSON.stringify(this.user))  //('token', 'true'); //
      console.log(this.USER_KEY, JSON.stringify(this.user));
      
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
      localStorage.removeItem(this.USER_KEY);
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }
}
