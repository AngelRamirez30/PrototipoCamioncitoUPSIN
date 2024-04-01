import { Component } from '@angular/core';
import { User } from '../../../auth/interfaces/user.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './notifications-page.component.html',
  styles: ``
})
export class NotificationsPageComponent {
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

  title = "NOTIFICACIONES"; // Define the title variable

  notifications = [
    { title: 'Cambio de ruta', msg: 'Accidente registrado sobre Av. Gabriel Leyva, se ha cambiado la ruta habitual.', time: '7:40 a.m.' },
    { title: 'Retraso de llegada', msg: 'Problema técnico presentado en el camión', time: '6:40 a.m.' },
    { title: 'Suspensión de ruta', msg: 'Debido a la situación climatológica se ha suspendido el servicio de transporte.', time: '6:00 a.m.' },
    { title: 'Cambio de ruta', msg: 'Accidente registrado sobre Av. Gabriel Leyva, se ha cambiado la ruta habitual.', time: '7:40 a.m.' },
    { title: 'Retraso de llegada', msg: 'Problema técnico presentado en el camión', time: '6:40 a.m.' },
    { title: 'Suspensión de ruta', msg: 'Debido a la situación climatológica se ha suspendido el servicio de transporte.', time: '6:00 a.m.' }
  ]
}
