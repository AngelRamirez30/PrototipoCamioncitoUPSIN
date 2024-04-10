import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { LayoutPageComponent } from '../layout-page/layout-page.component';

@Component({
  templateUrl: './help-page.component.html',
  styles: ``
})
export class HelpPageComponent {
  constructor(
    private layoutPage: LayoutPageComponent
  ){}

  ngOnInit(): void {
    this.layoutPage.changeHeaderTitle('Soporte');
  }

  question = [
      { title: '¿Para qué sirve el ícono de contactos?', answer: 'El ícono ubicado en el menú principal permite visualizar y configurar contactos de emergencia.' },
      { title: '¿Qué función tiene la opción de "historial de viajes"?', answer: 'El historial de viajes te permite tener un registro que te permitirá tener una evidencia para justificar tu retardo.' },
      { title: '¿Por qué no puedo visualizar la ruta?', answer: 'Asegúrsese de tener conexión Wi-Fi, si el problem persiste, reporta tu caso en la ventana de opciones.' },
      { title: 'Puedo enviar mensajes al chat?', answer: 'Solo el chofer tiene la opción de poder enviar mensajes al chat, esto con el fin de informar algún inconveniente.' },
      { title: 'Dónde se puede reportar un error?', answer: 'Se puede reportar problemas dando clic en el ícono inferior drecho. ¡Estamos en constante desarrollo!' },
      { title: 'Dónde puedo ver la ruta del camión?', answer: 'Se puede ver la ruta completa del camión dando clic en el mapa del menú principal' },
      { title: '¿Puedo iniciar sesión en otra cuenta?', answer: 'La aplicación te permite iniciar sesión con otras cuentas; en el menú de opciones se cuenta con la opción de cerrar sesión.' },
  ];
}
