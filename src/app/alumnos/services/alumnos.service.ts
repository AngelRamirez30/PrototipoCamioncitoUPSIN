import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Alumn } from '../../interfaces/alumn.interface';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {

  constructor(
    private fireStoreSvc: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  public getAlumnoData(): Observable<Alumn | null | undefined> {
    return this.uidCurrentUser().pipe(
      switchMap(uid => {
        if (uid) {
          return this.fireStoreSvc
            .collection('alumnos')
            .doc<Alumn>(uid)
            .valueChanges();
        } else {
          // Retornar un observable que emita null
          return of(null);
        }
      })
    );
  }

  public uidCurrentUser(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        return user ? of(user.uid) : of(null);
      })
    );
  }
}
