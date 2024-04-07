import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { AlumnosService } from '../../services/alumnos.service';
import { Router } from '@angular/router';
import { Alumn } from '../../../interfaces/alumn.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent implements OnInit, OnDestroy{
  public alumn!: Alumn;
  public dataLoaded = false;
  private dataSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private alumnosService: AlumnosService,
    private router: Router,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.dataSubscription.add(this.alumnosService.getAlumnoData().subscribe((data) => {
      this.alumn = data!;
      this.dataLoaded = true;
    }));
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

  onLogout(){
    this.authService.logout().then(() => {
      this.openSnackBar('Sesión cerrada', 2500);
    })
    .catch((error) => console.log(error))
    .finally(() => this.router.navigate(['/auth/login']));
  }

  public map_image = 'https://i.imgur.com/TN3iixl.png';


  openSnackBar(message: string, duration: number) {
    this.snackBar.open(message, undefined, {
      duration,
    });
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
