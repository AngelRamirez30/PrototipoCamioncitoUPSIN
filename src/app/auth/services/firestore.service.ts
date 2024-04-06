import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private fireStore: AngularFirestore
  ){}

  // Metodo para obtener un documento de la colección de usuarios
  getUser(path: string, uid: string){
    return this.fireStore.collection(path).doc(uid).valueChanges();
  }
}
