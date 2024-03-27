import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Course } from './types/course-type';
import { Observable } from 'rxjs';


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

  // delete Course
  deleteCourse(course: Course) {
    return this.afs.doc('/Courses/'+course.id).delete();
  }

  //edit Coures
  

  //update Course
  updateCourse(course: Course) {
    this.deleteCourse(course);
    this.addCourse(course);
  }

  // Prograns page functions
  getAllPrograms() {
    return this.afs.collection('/Programs').snapshotChanges()
  }

  getProgramById(programId: string): Observable<any> {
    return this.afs.doc<any>(`/Programs/${programId}`).snapshotChanges();
    debugger
  }

}
