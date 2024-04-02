import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Course } from './types/course-type';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private selectedProgram: any;

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

  //update Course
  updateCourse(course: Course) {
    this.deleteCourse(course);
    this.addCourse(course);
  }

  //Courses page
  getAllCorsesPage() {
    return this.afs.collection('/courses-list').snapshotChanges()
  }

  // Programs page functions
  getAllPrograms() {
    return this.afs.collection('/Programs').snapshotChanges()
  }

  getProgramById(programId: string): Observable<any> {
    return this.afs.doc(`/Programs/${programId}`).snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data();
        const id = action.payload.id;
        return {id, ...data as object};
      })
    )
    
  }

  setSelectedProgram(program: any) {
    this.selectedProgram = program;
  }

  getSelectedProgram() {
    return this.selectedProgram;
  }


}
