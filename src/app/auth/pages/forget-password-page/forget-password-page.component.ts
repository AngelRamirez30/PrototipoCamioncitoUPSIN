import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  templateUrl: './forget-password-page.component.html',
  styles: ``,
})
export class ForgetPasswordPageComponent {
  public email = new FormControl('', [Validators.required, Validators.email]);
  public sended: boolean = false;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {}

  async onReceiveEmail() {
    const email = this.email.value;
    try {
      const isRegistered = await this.authService.checkEmailExists(email!);
      if (isRegistered) {
        try {
          await this.authService.resetPassword(email!);
          this.openSnackBar('Email enviado', 2500);
        } catch (error) {
          this.openSnackBar('Error al enviar el correo', 2500);
        }
      } else {
        this.openSnackBar('Correo no registrado', 2500);
        this.email.reset();
      }
    } catch (error: any) {
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
    }
  }

  openSnackBar(message: string, duration: number) {
    this.snackBar.open(message, undefined, {
      duration,
    });
  }
}
