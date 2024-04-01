import { Injectable, NgZone } from '@angular/core';
import { User } from '../interfaces/user.interface';

import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiData = 'http://localhost:3000/usuarios';

  private user?: User;
  private email?: string;
  private uidUser?: string;

  constructor(
    private fbAuthService: AngularFireAuth,
    private ngZone: NgZone
  ){
    this.fbAuthService.authState.subscribe(user => {
      if(user){
        localStorage.setItem('prototipoToken', user.uid);
      }else{
        localStorage.removeItem('prototipoToken');
      }
    });
  }

  get currentUser(): User | undefined {
    if(!this.user) return undefined;
    return structuredClone(this.user);
  }

  login(email: string, password: string){
    return this.fbAuthService.signInWithEmailAndPassword(email, password)
      .then(({user}) => {
        if(!user) return console.error('No se ha podido logear');
        console.log(user);
        this.uidUser = user.uid;
        localStorage.setItem('prototipoToken', user.uid);
        this.ngZone.run(() => {
          console.log('Usuario logeado', this.user);
        });
      }).catch(error => {
        console.error('Error al logear',error);
      });
  }

  logout(){
    localStorage.removeItem('prototipoToken');
    return this.fbAuthService.signOut();
  }

  // async isEmailRegistered(email: string): Promise<boolean> {
  //   try {
  //     const userRecord = await fetchSignInMethodsForEmail(this.auth, email);
  //     return userRecord.length > 0;
  //   } catch (error) {
  //     console.error('Error al verificar el correo electrónico:', error);
  //     throw error;
  //   }
  // }

  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await this.fbAuthService.sendPasswordResetEmail(email); // Cambio aquí
    } catch (error) {
      console.error('Error al enviar el correo de recuperación de contraseña:', error);
      throw error;
    }
  }

  async getUserCurrentEmail(): Promise<string | null> {
    try {
      return new Promise((resolve, reject) => {
        this.fbAuthService.onAuthStateChanged( (user) => {
          if (user) {
            this.email = user.email!;
            console.log({user});
            resolve(user.email);
          } else {
            resolve(null);
          }
        }, (error) => {
          reject(error); // Manejamos cualquier error que ocurra
        });
      });
    } catch (error) {
      console.error('Error al obtener el correo electrónico del usuario:', error);
      throw error;
    }
  }

}
