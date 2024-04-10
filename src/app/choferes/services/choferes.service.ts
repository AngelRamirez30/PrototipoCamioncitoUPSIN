import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Chofer } from '../../interfaces/chofer.interface';
import { EMPTY, Observable, combineLatest, forkJoin, map, of, switchMap } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  Message,
  RouteFirebase,
  Route,
} from '../../interfaces/route.interface';

@Injectable({
  providedIn: 'root',
})
export class ChoferesService {
  constructor(
    private fireStoreSvc: AngularFirestore,
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ) {}

  public getChoferData(): Observable<Chofer | null | undefined> {
    return this.uidCurrentUser().pipe(
      switchMap((uid) => {
        if (!uid) {
          return of(null);
        } else {
          return this.fireStoreSvc
            .collection('choferes')
            .doc<Chofer>(uid)
            .valueChanges();
        }
      })
    );
  }

  public uidCurrentUser(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        return user ? of(user.uid) : of(null);
      })
    );
  }
  getRouteData(): Observable<Route> {
    return this.getChoferData().pipe(
      switchMap((chofer) => {
        if (!chofer || !chofer.idRuta) {
          throw new Error('El chofer no tiene una ruta asignada.');
        }
        return this.fireStoreSvc
          .collection('rutas')
          .doc(chofer.idRuta.toString())
          .valueChanges() as Observable<RouteFirebase>;
      }),
      map((routeFirebase: RouteFirebase) => {
        const messages: Message[] = Array.isArray(routeFirebase.messages)
          ? routeFirebase.messages.map((messageFirebase) => ({
              idChofer: messageFirebase.idChofer,
              mensaje: messageFirebase.mensaje,
              hora: new Date(
                messageFirebase.hora.seconds * 1000 +
                  messageFirebase.hora.nanoseconds / 1000000
              ),
            }))
          : [];
        return {
          nombre: routeFirebase.nombre,
          messages: messages,
        };
      })
    );
  }

  sendMessage(message: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.getChoferData().pipe(
        switchMap(chofer => {
          if (!chofer || !chofer.idRuta) {
            throw new Error('El chofer actual no tiene una ruta asignada.');
          }
          return this.uidCurrentUser().pipe(
            switchMap(uid => {
              if (!uid) {
                throw new Error('No se pudo obtener el UID del chofer actual.');
              }
              const messageData = {
                idChofer: uid,
                mensaje: message,
                hora: new Date()
              };
              return this.fireStoreSvc.collection('rutas').doc(chofer.idRuta.toString()).get();
            }),
            switchMap(routeSnapshot => {
              const routeData:any = routeSnapshot.data();
              if (routeData && Array.isArray(routeData.messages)) {
                return this.uidCurrentUser().pipe(
                  switchMap(uid => {
                    if (!uid) {
                      throw new Error('No se pudo obtener el UID del chofer actual.');
                    }
                    const messageData = {
                      idChofer: uid,
                      mensaje: message,
                      hora: new Date()
                    };
                    const messages = routeData.messages.concat(messageData);
                    return this.fireStoreSvc.collection('rutas').doc(chofer.idRuta.toString()).update({
                      messages: messages
                    });
                  })
                );
              } else {
                // Si routeData o routeData.messages no están definidos correctamente, no hacemos ninguna actualización
                console.error('No se pudo encontrar el documento de ruta o los mensajes no están en el formato esperado.');
                return EMPTY; // Retorna un observable vacío para evitar errores de tipo
              }
            })
          );
        })
      ).subscribe(() => {
        resolve(); // Resuelve la Promise cuando el mensaje se envía exitosamente
      }, error => {
        reject(error); // Rechaza la Promise si ocurre algún error durante el envío del mensaje
      });
    });
  }


}
