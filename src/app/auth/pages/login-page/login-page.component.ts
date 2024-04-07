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
import { switchMap } from 'rxjs';
import { RoleUser } from '../../../interfaces/user.interface';

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
      this.authService
        .login(email, password)
        .then(({ user }) => {
          if (user) {
            this.openSnackBar('Inicio de sesión exitoso', 2500);
            this.redirigirUsuario(user.uid);
          }else {
            throw new Error('Usuario no encontrado');
          }
        })
        .catch((error) => {
          console.error('Error al iniciar sesión:', error);
          switch (error.code) {
            case 'auth/wrong-password':
              this.openSnackBar('Contraseña incorrecta', 2500);
              break;
            case 'auth/user-not-found':
              this.openSnackBar('Usuario no encontrado', 2500);
              break;
            case 'auth/invalid-credential':
              this.openSnackBar('Credenciales inválidas', 2500);
              break;
            case 'auth/invalid-email':
              this.openSnackBar('Correo inválido', 2500);
              break;
          }
        });
    }
  }

  openSnackBar(message: string, duration: number) {
    this.snackBar.open(message, undefined, {
      duration,
    });
  }

  redirigirUsuario(uid: string) {
    this.authService.getRoleUser(uid).subscribe((user) => {
      if (user) {
        const { rol } = user;
        switch (rol) {
          case 'alumno':
            this.router.navigateByUrl('/alumnos/home');
            break;
          case 'chofer':
            this.router.navigate(['/choferes']);
            break;
        }
      }
    });
  }
}
