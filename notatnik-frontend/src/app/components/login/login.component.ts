import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authService: AuthService,
    private router: Router) { }
  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  logIn(){
    if (!this.loginForm.valid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.authService.login(email, password).subscribe(() => {
        this.router.navigate(['/'])
      })
    }
  }
}