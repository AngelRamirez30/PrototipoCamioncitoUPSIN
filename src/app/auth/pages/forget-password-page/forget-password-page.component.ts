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
    private router: Router
  ) {}


  async onReceiveEmail() {
    const email = this.email.value;
    try {
      const isRegistered = await this.authService.checkEmailExists(email!);
      if (isRegistered) {
        try {
          await this.authService.resetPassword(email!);
          this.snackBar.open('Email enviado', undefined, {
            duration: 2500,
          });
        } catch (error) {
          this.snackBar.open('Error al enviar email, intentelo de nuevo', undefined, {
            duration: 2500,
          });
        }
      } else {
        // Manejar el caso cuando el correo electrónico no está registrado
        console.log('El correo electrónico no está registrado');
        this.snackBar.open('Email no registrado', undefined, {
          duration: 2500,
        });
        this.email.reset();
      }
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      switch (error.code) {
        case 'auth/wrong-password':
          this.snackBar.open('Contraseña incorrecta', undefined, {
            duration: 2500,
          });
          break;
          case 'auth/user-not-found':
            this.snackBar.open('Cuenta no encontrada', undefined, {
              duration: 2500,
            });
            break;
        case 'auth/invalid-credential':
          this.snackBar.open('Cuenta inexistente', undefined, {
            duration: 2500,
          });
          break;
        case 'auth/invalid-email':
          this.snackBar.open('Correo invalido', undefined, {
            duration: 2500,
          });
          break;
      }
    }
  }
}
