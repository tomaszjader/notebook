import { Component } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { NoteFormComponent } from '../note-form/note-form.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent {
  notes: any[] = [];
  userId: any;
  email: any | undefined;
  constructor(
    private noteService: NoteService,
    public dialog: MatDialog,
    public auth: AuthService,
    private router: Router
  ) {
    this.auth.curentUser$.subscribe((user)=>{
      if(user){
        this.userId = user.displayName;
        this.noteService.getNotes(this.userId).subscribe((data: any) => {
          this.notes = data;
        });
      }
    })
  }

  ngOnInit() {
   
  }
  onClickNote(note: any) {
    this.dialog
      .open(NoteFormComponent, { height: '400px',
        width: '600px', data: { note: note, action: 'edit',userId: this.userId} })
      .afterClosed().subscribe(()=>{
        this.noteService.getNotes(this.userId).subscribe((data: any) => {
          this.notes = data;
        });
      })
  }
  onClickNoteForm() {
    this.dialog.open(NoteFormComponent, { height: '300px',
      width: '600px', data: { note: {}, action: 'add', userId: this.userId } }).afterClosed().subscribe(()=>{
      this.noteService.getNotes(this.userId).subscribe((data: any) => {
        this.notes = data;
      });
    })
  }


  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/login'])
    })
  }
}
