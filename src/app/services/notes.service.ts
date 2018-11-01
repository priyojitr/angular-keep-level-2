import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Note } from '../note';

@Injectable()
export class NotesService {
  private _notesUrl: string;
  public bearerToken: any;

  constructor(private _authService: AuthenticationService,
    private http: HttpClient) {
      this._notesUrl = 'http://localhost:3000/api/v1/notes/';
      this.bearerToken = this._authService.getBearerToken();
  }

  getNotes(): Observable<Array<Note>> {
    return this.http.get<Array<Note>>(this._notesUrl, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.bearerToken}`)
    });
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this._notesUrl, note, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.bearerToken}`)
    });
  }

}
