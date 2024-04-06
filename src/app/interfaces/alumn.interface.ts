export interface AlumnFirebase {
  apellidos: string;
  nombre: string;
  registrosViajes: RegistrosViajeFirebase[];
  numTel: string;
  email: string;
  idCarrera: number;
  fechaNac: DateFirebase;
  contactosDeEmergencia: ContactoDeEmergencia[];
}

export interface ContactoDeEmergencia {
  nombre: string;
  numTel: string;
}

export interface DateFirebase {
  seconds: number;
  nanoseconds: number;
}

export interface RegistrosViajeFirebase {
  idViaje: number;
  horaBajada: DateFirebase;
  horaSubida: DateFirebase;
}

export interface Alumn {
  apellidos: string;
  nombre: string;
  registrosViajes: RegistrosViaje[];
  numTel: string;
  email: string;
  idCarrera: number;
  fechaNac: Date;
  contactosDeEmergencia: ContactoDeEmergencia[];
}

export interface RegistrosViaje {
  idViaje: number;
  horaBajada: Date;
  horaSubida: Date;
}
