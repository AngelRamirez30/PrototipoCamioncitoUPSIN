import { Injectable, NgZone } from '@angular/core';
import { RoleUser } from '../../interfaces/user.interface';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  UserCredential,
  getAuth,
  sendPasswordResetEmail,
} from '@angular/fire/auth';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, first } from 'rxjs';
import { map } from 'jquery';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private uidUser?: string;

  constructor(
    private fbAuthService: AngularFireAuth,
    private ngZone: NgZone,
    private firestoreSvc: AngularFirestore
  ) {}

  stateUser() {
    return this.fbAuthService.authState;
  }

  getRoleUser(uid: string): Observable<RoleUser | undefined> {
    return this.firestoreSvc.collection('roles-usuarios').doc<RoleUser>(uid).valueChanges();
  }

  get currentUser() {
    // if(!this.user) return undefined;
    // return structuredClone(this.user);
    return this.fbAuthService.currentUser;
  }

  get getAuth() {
    return getAuth();
  }

  async login(email: string, password: string) {
    return this.fbAuthService.signInWithEmailAndPassword(email, password);
  }



  // Método para enviar un correo de recuperación de contraseña
  resetPassword(email: string): Promise<void> {
    return this.fbAuthService.sendPasswordResetEmail(email);
  }

  //
  checkEmailExists(email: string): Promise<boolean>{
    return this.fbAuthService.fetchSignInMethodsForEmail(email)
      .then((providers) => {
        return providers.length > 0;
      });
  }

  async logout() {
    return this.fbAuthService.signOut();
  }
}
