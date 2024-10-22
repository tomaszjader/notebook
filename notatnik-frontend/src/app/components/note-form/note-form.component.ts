import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { NoteService } from 'src/app/services/note.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
})
export class NoteFormComponent implements OnInit {

  noteForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });

  userId = 1;
  note: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private noteService: NoteService
  ) {
    this.note = data.note;
    this.userId = data.userId;
    if (data.action == 'add') {
      this.note.title = '';
      this.note.content = '';
    }else{
      this.noteForm.patchValue({
        title: this.note.title,
        content: this.note.content
      });
    }
  }

  ngOnInit() {}

  onSave() {
    if (this.data.action == 'add') {
      this.noteService
        .addNote(this.userId, {
          title: this.noteForm.get('title')?.value,
          content: this.noteForm.get('content')?.value,
        })
        .subscribe((data) => {
          console.log(data);
        });
    } else {
      this.noteService
        .updateNote(this.userId, this.note.id, {
          title: this.noteForm.get('title')?.value,
          content: this.noteForm.get('content')?.value,
        })
        .subscribe((data) => {
          console.log(data);
        });
    }
  }
  onDelete() {
    this.noteService.deleteNote(this.userId, this.note.id).subscribe((data) => {
      console.log(data);
    });
  }
}
