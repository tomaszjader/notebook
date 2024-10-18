import { Component } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';


@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent {
  notes: any[] = [];
  userId = 1;

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.noteService.getNotes(this.userId).subscribe((data:any) => {
      console.log(data)
      this.notes = data;
    });
  }
  onClickNote(note:any){
    console.log(note);
  }
}
