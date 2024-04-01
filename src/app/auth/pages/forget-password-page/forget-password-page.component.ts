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

  // async onReceiveEmail(): Promise<void> {
  //   try {
  //     if (this.email.valid) {
  //       console.log(this.email.value);
  //       const isRegistered = await this.authService.isEmailRegistered(
  //         this.email.value!
  //       );
  //       if (isRegistered) {
  //         await this.authService.sendPasswordResetEmail(this.email.value!);
  //         this.snackBar.open('Email enviado', undefined, {
  //           duration: 2500,
  //         });
  //         console.log('Email enviado');
  //         this.sended = true;
  //         // this.router.navigateByUrl('/auth/login');
  //       } else {
  //         console.log('Email no registrado');
  //         this.snackBar.open('Email no registrado', undefined, {
  //           duration: 2500,
  //         });
  //         this.email.reset();
  //       }
  //     } else {
  //       console.log('Correo electrónico inválido');
  //       this.snackBar.open('Correo electrónico inválido', undefined, {
  //         duration: 2500,
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error al recibir el correo electrónico:', error);
  //     this.snackBar.open('Error al recibir el correo electrónico', undefined, {
  //       duration: 2500,
  //     });
  //   }
  // }

  async onReceiveEmail(): Promise<void> {
    try{
      if(this.email.valid){
        await this.authService.sendPasswordResetEmail(this.email.value!);
        this.snackBar.open('Email enviado', undefined, {
          duration: 2500,
        });
        console.log('Email enviado');
        this.sended = true;
      }else{
        console.log('Correo electrónico inválido');
        this.snackBar.open('Correo electrónico inválido', undefined, {
          duration: 2500,
        });
      }
    }catch(error){
      console.error('Error al recibir el correo electrónico:', error);
      this.snackBar.open('Error al recibir el correo electrónico', undefined, {
        duration: 2500,
      });
    }
  }
}
