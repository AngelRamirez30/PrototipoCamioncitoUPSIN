import { Component } from '@angular/core';
import { User } from '../../../auth/interfaces/user.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './messages-page.component.html',
  styles: ``
})
export class MessagesPageComponent {
  
  constructor(
    private authService: AuthService,
    private router: Router,
  ){}

  public sidebarItems = [
    {name: 'Menú Principal', icon:'home',   url: '/alumnos/'},
    {name: 'Historial', icon:'schedule',   url: '/alumnos/history'},
    {name: 'Ayuda',     icon:'headphones', url: '/alumnos/help'},
    {name: 'Mensajes',  icon:'chat',       url: '/alumnos/messages'},
    {name: 'Contactos', icon:'contact_emergency',    url: '/alumnos/contacts'},
    {name: 'Notificaciones', icon:'notifications',   url: '/alumnos/notifications'},
    {name: 'Configuracion',  icon:'settings',   url: '/alumnos/config'},
  ];

  onLogout(): void{
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  get user(): User | undefined {
    return this.authService.currentUser;
  }

  title = "MENSAJES DEL CHOFER"; // Define the title variable
  chofer_pfp = "https://hips.hearstapps.com/hmg-prod/images/walter-white-secuela-breaking-bad-1560364306.jpg";
  background_image = "https://i.imgur.com/jf3jTVA.jpeg"

  messages = [
    { msg: 'Me paré a comprar un caffenio, jovenes', time: '6:45 a.m.'},
    { msg: 'Una llanta se ponchó, el camión se retrasará', time: '6:46 a.m.'},
    { msg: 'How when haces tus momos en mensajes de alumnos', time: '6:47 a.m.'},
    { msg: 'El futuro es hoy, ¿oíste, viejo?', time: '6:48 a.m.'}
  ];
}
