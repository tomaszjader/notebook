import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private apiUrl = 'http://127.0.0.1:3000/users';

  constructor(private http: HttpClient) {}

  getNotes(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}/notes/`, {
      headers: { Accept: 'application/json' },
    });
  }

  addNote(userId: number, noteData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}/notes`, noteData);
  }

  deleteNote(userId: number, noteId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}/notes/${noteId}`);
  }

  updateNote(userId: number, noteId: number, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${userId}/notes/${noteId}`, data);
  }
  
  addUser(userName: string, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, {username:userName, email:email});
  }
}
