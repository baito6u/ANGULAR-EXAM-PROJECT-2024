import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AboutComponent } from './main/about/about.component';
import { CoursesComponent } from './main/courses/courses.component';
import { ProgramsComponent } from './main/programs/programs.component';
import { ProfileComponent } from './user/profile/profile.component';
import { DetailsComponent } from './main/details/details.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'about', component: AboutComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'programs', component: ProgramsComponent},
  {path: 'details/:id', component: DetailsComponent},
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
