import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Alumn, AlumnFirebase } from '../../interfaces/alumn.interface';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {

  constructor(
    private fireStoreSvc: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  public getAlumnoData(): Observable<Alumn | null> {
    return this.uidCurrentUser().pipe(
      switchMap(uid => {
        if (!uid) {
          return of(null);
        } else {
          return this.fireStoreSvc
            .collection('alumnos')
            .doc<AlumnFirebase>(uid)
            .valueChanges()
            .pipe(
              map(alumnFirebase => this.transformarAlumn(alumnFirebase!))
            );
        }
      })
    );
  }
  
  private transformarAlumn(alumnFirebase: AlumnFirebase): Alumn {
    return {
      apellidos: alumnFirebase.apellidos,
      nombre: alumnFirebase.nombre,
      registrosViajes: alumnFirebase.registrosViajes.map(registro => {
        return {
          idViaje: registro.idViaje,
          horaBajada: new Date(registro.horaBajada.seconds * 1000 + registro.horaBajada.nanoseconds / 1000000),
          horaSubida: new Date(registro.horaSubida.seconds * 1000 + registro.horaSubida.nanoseconds / 1000000)
        };
      }),
      numTel: alumnFirebase.numTel,
      email: alumnFirebase.email,
      idCarrera: alumnFirebase.idCarrera,
      fechaNac: new Date(alumnFirebase.fechaNac.seconds * 1000 + alumnFirebase.fechaNac.nanoseconds / 1000000),
      contactosDeEmergencia: alumnFirebase.contactosDeEmergencia
    };
  }

  public uidCurrentUser(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        return user ? of(user.uid) : of(null);
      })
    );
  }
}
