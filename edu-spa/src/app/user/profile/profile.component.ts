import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';
import { Note } from 'src/app/shared/types/note-type';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  program: any;
  editedNote: any = null;
  notesList: Note[] = [];
  noteObj: Note = {
    id: '',
    note_name: '',
    description: '',
    date: '',
  };

  id: string = '';
  note_name: string = '';
  description: string = '';
  date: string = '';
  note: any;

  constructor(private auth: AuthService, private dataService: DataService) {}

  ngOnInit(): void {
    this.getAllNotes();
    this.program = this.dataService.getSelectedProgram();
  }

  register() {
    this.auth.SignOut();
  }

  getAllNotes() {
    this.dataService
      .getAllNotes()
      .pipe(
        tap((res: any[]) => {
          this.notesList = res.map((e: any) => {
            const data = e.payload.doc.data();
            data.id = e.payload.doc.id;
            return data;
          });
        })
      )
      .subscribe({
        error: (err) => {
          alert('Error while fetching note data');
        },
      });
  }

  resetForm() {
    this.id = '';
    this.note_name = '';
    this.description = '';
    this.date = '';
  }

  addNote() {
    if (this.note_name == '' || this.description == '' || this.date == '') {
      alert('Fill all imput fields');
      return;
    }

    if (this.editedNote) {
      // Update the existing course
      this.editedNote.note_name = this.note_name;
      this.editedNote.description = this.description;
      this.editedNote.date = this.date;

      this.dataService.updateNotes(this.editedNote);
      this.resetForm();
      this.editedNote = null; // Reset editedCourse after updating
    } else {
      // Add a new course
      this.noteObj.id = '';
      this.noteObj.note_name = this.note_name;
      this.noteObj.description = this.description;
      this.noteObj.date = this.date;

      this.dataService.addNote(this.noteObj);
      this.resetForm();
    }
  }

  editNote(course: Note) {
    this.editedNote = { ...course };

    // Populate the form fields with the details of the selected note
    this.id = this.editedNote.id;
    this.note_name = this.editedNote.note_name;
    this.description = this.editedNote.description;
    this.date = this.editedNote.date;
  }

  deleteNote(note: Note) {
    if (
      window.confirm(
        'Are you shure you want to delete ' + note.note_name + '?'
      )
    ) {
      this.dataService.deleteNote(note);
    }
  }
}
