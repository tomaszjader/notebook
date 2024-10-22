import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithEmailLink, updateProfile} from '@angular/fire/auth';
import { from, switchMap } from 'rxjs';
import { NoteService } from './note.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    
curentUser$ = authState(this.auth);
  constructor(private auth: Auth,private  noteService: NoteService) {}


  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  logout() {
    return from(this.auth.signOut());
  }

  signUp(email: string, password: string, id: any) {
    
        return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
            switchMap(({ user }) => updateProfile(user, { displayName: id}))
          );
      
  }
}
