import { Component } from '@angular/core';
import { User } from '../../../auth/interfaces/user.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ){}

  public sidebarItems = [
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

  map_image = 'https://i.imgur.com/TN3iixl.png';
}
