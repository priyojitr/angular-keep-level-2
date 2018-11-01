import { Component, OnInit } from '@angular/core';
// custom app class & services
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  note: Note;
  notes: Array<Note>;
  errMessage: string;

  constructor(private _noteService: NotesService) {
    this.note = new Note();
    this.errMessage = '';
  }

  ngOnInit() {
    // get all notes
    this._noteService.getNotes().subscribe(
      data => this.notes = data,
      err => this.errMessage = err.error.message
    );
  }

  takeNote() {
    this.notes.push(this.note);
    this._noteService.addNote(this.note).subscribe(
      data => { },
      err => {
        const index: number = this.notes.findIndex(
          note => note.title === this.note.title
        );
        this.notes.splice(index, 1);
      }
    );
    this.note = new Note();
  }
}
