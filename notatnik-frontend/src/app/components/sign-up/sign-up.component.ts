import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  constructor(private authService: AuthService, private router: Router,private noteService: NoteService) {}
  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  signUp() {
    if (!this.signUpForm.valid) {
      return;
    }
    const {name, email, password } = this.signUpForm?.value;
    if (name&&email && password) {

      this.noteService.addUser(name, email).subscribe((data) => {
        console.log(data);
        this.authService.signUp(email, password, data.id).subscribe(() => {
          this.router.navigate(['/']);
        });
      })
      
    }
  }
}
