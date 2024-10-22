import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { LoginComponent } from './components/login/login.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';


const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['']);
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NoteListComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectToHome)
  },
  {
    path: 'sign-up',
    pathMatch: 'full',
    component: SignUpComponent,
    ...canActivate(redirectToHome)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
