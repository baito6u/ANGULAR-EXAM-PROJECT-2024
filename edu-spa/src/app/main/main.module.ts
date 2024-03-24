import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { ProgramsComponent } from './programs/programs.component';
import { AboutComponent } from './about/about.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    HomeComponent,
    CoursesComponent,
    ProgramsComponent,
    AboutComponent
  ],
  imports: [
    CommonModule, RouterModule, SharedModule
  ],
  exports: [HomeComponent,CoursesComponent, ProgramsComponent, AboutComponent]
})
export class MainModule { }
