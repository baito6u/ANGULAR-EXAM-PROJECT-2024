import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Note } from './types/note-type';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private selectedProgram: any;

  constructor(private afs: AngularFirestore) {}

  //add course
  addNote(note: Note) {
    note.id = this.afs.createId();
    return this.afs.collection('/Notes').add(note);
  }

  //get all Courses
  getAllNotes() {
    return this.afs.collection('/Notes').snapshotChanges();
  }

  // delete Course
  deleteNote(note: Note) {
    return this.afs.doc('/Notes/' + note.id).delete();
  }

  //update Course
  updateNotes(note: Note) {
    this.deleteNote(note);
    this.addNote(note);
  }

  //Courses page
  getAllCorsesPage() {
    return this.afs.collection('/courses-list').snapshotChanges();
  }

  // Programs page functions
  getAllPrograms() {
    return this.afs.collection('/Programs').snapshotChanges();
  }

  getProgramById(programId: string): Observable<any> {
    return this.afs
      .doc(`/Programs/${programId}`)
      .snapshotChanges()
      .pipe(
        map((action) => {
          const data = action.payload.data();
          const id = action.payload.id;
          return { id, ...(data as object) };
        })
      );
  }

  setSelectedProgram(program: any) {
    this.selectedProgram = program;
  }

  getSelectedProgram() {
    return this.selectedProgram;
  }
}
