import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
  styles: ``,
})
export class LoginPageComponent {


  public loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  onLogin(): void {
    const { email, password } = this.loginForm.value;
    if (email?.trim() && password?.trim()) {
      this.authService.login(email!, password!).then(() => {
        // if (user) {
          this.router.navigateByUrl('/alumnos');
          this.snackBar.open('Haz ingresado correctamente', 'ok', {
            duration: 2500,
          });
        // } else {
          // this.snackBar.open('Cuenta inexsistente', undefined, {
          //   duration: 2500,
          // });
          // this.loginForm.reset({
          //   email: this.loginForm.value.email,
          //   password: '',
          // });
        // }
      });
    }
  }
}
