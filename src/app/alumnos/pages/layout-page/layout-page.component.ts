import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { AlumnosService } from '../../services/alumnos.service';
import { Router } from '@angular/router';
import { Alumn } from '../../../interfaces/alumn.interface';

@Component({
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {
  public alumn!: Alumn;
  public dataLoaded = false
  constructor(
    private authService: AuthService,
    private alumnosService: AlumnosService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.alumnosService.getAlumnoData().subscribe((data) => {
      console.log(data);
      this.alumn = data!;
      this.dataLoaded = true;
    });
  }

  public sidebarItems = [
    {name: 'Home', icon:'home',   url: '/alumnos/home'},
    {name: 'Historial', icon:'schedule',   url: '/alumnos/history'},
    {name: 'Ayuda',     icon:'headphones', url: '/alumnos/help'},
    {name: 'Mensajes',  icon:'chat',       url: '/alumnos/messages'},
    {name: 'Contactos', icon:'contact_emergency',    url: '/alumnos/contacts'},
    {name: 'Notificaciones', icon:'notifications',   url: '/alumnos/notifications'},
    {name: 'Configuracion',  icon:'settings',   url: '/alumnos/config'},

  ];

  onLogout(): void{
    this.authService.logout().then(() => {
      console.log('logged out');
      this.router.navigate(['/auth/login']);
    });
  }

  // get user() {
  //   return this.authService.currentUser;
  // }

  public map_image = 'https://i.imgur.com/TN3iixl.png';
}
