import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';
import { Course } from 'src/app/shared/types/course-type';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  
  coursesList: Course[] = [];
  courseObj: Course = {
    id: '',
    course_name: '',
    description: '',
    date: ''
  };
  
  id: string = '';
  course_name: string = '';
  description: string = '';
  date: string = '';

  constructor(private auth: AuthService, private data: DataService) {}

  ngOnInit(): void {
    this.getAllCourses();
  }

  register() {
    this.auth.SignOut();
  }

  getAllCourses() {
    this.data.getAllCourses().subscribe(res => {
        this.coursesList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
      },
      (err) => {
        alert('Error while fetching course data');
      }
    );
  }

  resetForm() {
  this.id = '';
  this.course_name = '';
  this.description = '';
  this.date = '';

  }

  addCourse() {

    // if(this.course_name == '' || this.description == '' || this.date) {
    //   alert('Fill all imput fields');
    //   return;
    // }

    this.courseObj.id = '';
    this.courseObj.course_name = this.course_name;
    this.courseObj.description = this.description;
    this.courseObj.date = this.date;

    this.data.addCourse(this.courseObj);
    this.resetForm();
  }

  updateCourse() {}

  deleteCourse(course: Course) {
    if (window.confirm('Are you shure you want to delete '+course.course_name + '?')) {
      this.data.deleteCourse(course);
    }
  }
}
