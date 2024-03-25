import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Course } from './types/course-type';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }

  //add course
  addCourse(course: Course) {
    course.id = this.afs.createId();
    return this.afs.collection('/Courses').add(course)
  }

  //get all Courses
  getAllCourses() {
    return this.afs.collection('/Courses').snapshotChanges()
  }

  getAllPrograms() {
    return this.afs.collection('/Programs').snapshotChanges()
  }
  // delete Course
  deleteCourse(course: Course) {
    return this.afs.doc('/Courses/'+course.id).delete();
  }

  //update Course
  updateCourse(course: Course) {
    this.deleteCourse(course);
    this.addCourse(course);
  }
}
