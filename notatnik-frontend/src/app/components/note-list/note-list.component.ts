import { Component } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { NoteFormComponent } from '../note-form/note-form.component';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent {
  notes: any[] = [];
  userId = 1;

  constructor(private noteService: NoteService, public dialog: MatDialog) {}

  ngOnInit() {
    this.noteService.getNotes(this.userId).subscribe((data:any) => {
      this.notes = data;
    });
  }
  onClickNote(note:any){
    this.dialog.open(NoteFormComponent, {data: { note: note, action:'edit'} });
  }
  onClickNoteForm(){
    this.dialog.open(NoteFormComponent, {data: { note: {}, action:'add'}});
  }
}
