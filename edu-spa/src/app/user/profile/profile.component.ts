import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';
import { Course } from 'src/app/shared/types/course-type';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  program: any;

  coursesList: Course[] = [];
  courseObj: Course = {
    id: '',
    course_name: '',
    description: '',
    date: '',
  };

  id: string = '';
  course_name: string = '';
  description: string = '';
  date: string = '';
  course: any;

  editedCourse: any = null;

  constructor(private auth: AuthService, private dataService: DataService) {}

  ngOnInit(): void {
    this.getAllCourses();

    this.program = this.dataService.getSelectedProgram();
  }

  register() {
    this.auth.SignOut();
  }

  getAllCourses() {
    this.dataService.getAllCourses()
      .pipe(
        tap((res: any[]) => {
          this.coursesList = res.map((e: any) => {
            const data = e.payload.doc.data();
            data.id = e.payload.doc.id;
            return data;
          });
        })
      )
      .subscribe({
        error: (err) => {
          alert('Error while fetching course data');
        }
      });
  }

  resetForm() {
    this.id = '';
    this.course_name = '';
    this.description = '';
    this.date = '';
  }

  addCourse() {
    if (this.course_name == '' || this.description == '' || this.date == '') {
      alert('Fill all imput fields');
      return;
    }

    if (this.editedCourse) {
      // Update the existing course
      this.editedCourse.course_name = this.course_name;
      this.editedCourse.description = this.description;
      this.editedCourse.date = this.date;
  
      this.dataService.updateCourse(this.editedCourse);
      this.resetForm();
      this.editedCourse = null; // Reset editedCourse after updating
    } else {
      // Add a new course
      this.courseObj.id = '';
      this.courseObj.course_name = this.course_name;
      this.courseObj.description = this.description;
      this.courseObj.date = this.date;
  
      this.dataService.addCourse(this.courseObj);
      this.resetForm();
    }
  }

  editCourse(course: Course) {
    this.editedCourse = { ...course };
  
  // Populate the form fields with the details of the selected course
  this.id = this.editedCourse.id;
  this.course_name = this.editedCourse.course_name;
  this.description = this.editedCourse.description;
  this.date = this.editedCourse.date;
  }

  

  deleteCourse(course: Course) {
    if (
      window.confirm(
        'Are you shure you want to delete ' + course.course_name + '?'
      )
    ) {
      this.dataService.deleteCourse(course);
    }
  }
}
