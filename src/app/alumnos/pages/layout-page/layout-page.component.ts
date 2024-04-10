import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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
  private routeDataSubscription: Subscription = new Subscription();
  public headerTitle?: string;

  constructor(
    private authService: AuthService,
    private alumnosService: AlumnosService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.dataSubscription.add(this.alumnosService.getAlumnoData().subscribe((data) => {
      this.alumn = data!;
    }));
    this.routeDataSubscription.add(this.alumnosService.getRouteData().subscribe((data) => {
      if(this.dataLoaded)
        this.mostrarNotificacion();
      this.dataLoaded = true;
    }));
  }
  mostrarNotificacion(): void {
    this.snackBar.open('¡Tienes un nuevo mensaje!', 'Ir al mensaje',
    {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    }
    ).onAction().subscribe(() => {
      // Lógica para redirigir al usuario a la página del mensaje
      this.router.navigate(['/alumnos/messages']);
    });
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
    this.routeDataSubscription.unsubscribe();
  }

  public changeHeaderTitle(newTitle: string): void {
    this.headerTitle = newTitle;
    this.cdr.detectChanges();
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
}
