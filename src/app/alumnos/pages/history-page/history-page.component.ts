import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './history-page.component.html',
  styles: ``
})
export class HistoryPageComponent {

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

  get user() {
    return this.authService.currentUser;
  }

  title = "HISTORIAL DE VIAJES"; // Define the title variable

  travelPeriods = [
    {
      label: 'Últimos 7 días',
      items: [
        { address: 'Av. Gabriel Leyva 3324, Loma Atravesada', time: '6:45 a.m.' },
        { address: 'Av. Gabriel Leyva 3324, Loma Atravesada', time: '6:20 a.m.' },
        { address: 'Centro Gral. Ángeles Flores, Centro, 82000', time: '6:40 a.m.' },
        { address: 'Centro Gral. Ángeles Flores, Centro, 82000', time: '6:40 a.m.' }
      ]
    },
    {
      label: 'Febrero',
      items: [
        { address: 'Av. Gabriel Leyva 3324, Loma Atravesada', time: '6:45 a.m.' },
        { address: 'Av. Gabriel Leyva 3324, Loma Atravesada', time: '6:20 a.m.' },
        { address: 'Centro Gral. Ángeles Flores, Centro, 82000', time: '6:40 a.m.' },
        { address: 'Centro Gral. Ángeles Flores, Centro, 82000', time: '6:40 a.m.' }
      ]
    }
  ];
}
