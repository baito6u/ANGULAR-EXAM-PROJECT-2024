import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { ProgramsComponent } from './programs/programs.component';
import { AboutComponent } from './about/about.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DetailsComponent } from './details/details.component';



@NgModule({
  declarations: [
    HomeComponent,
    CoursesComponent,
    ProgramsComponent,
    AboutComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule, RouterModule, SharedModule
  ],
  exports: [HomeComponent,CoursesComponent, ProgramsComponent, AboutComponent, DetailsComponent]
})
export class MainModule { }
