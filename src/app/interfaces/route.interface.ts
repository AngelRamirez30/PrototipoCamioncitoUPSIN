export interface RouteFirebase{
  nombre: string;
  messages: MessageFirebase[];
}

export interface Route{
  nombre: string;
  messages: Message[];
}

export interface MessageFirebase {
  idChofer: number;
  mensaje: string;
  hora: { seconds: number; nanoseconds: number }; // Timestamp de Firebase
}

export interface Message {
  idChofer: number;
  mensaje: string;
  hora: Date; // Tipo Date de JavaScript
}
