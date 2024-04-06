import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './configuration-page.component.html',
  styles: ``
})
export class ConfigurationPageComponent {
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

  get user(){
    return this.authService.currentUser;
  }

  title = "CONFIGURACIÓN"; // Define the title variable
  user_pfp = "https://64.media.tumblr.com/0cf601b9cada3f81afddab5a185c6821/df94fd0d2752edcd-fe/s1280x1920/27d77b7c19942c03edc63273e4b3699dff132141.jpg"
}
