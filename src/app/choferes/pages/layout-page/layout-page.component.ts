import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chofer } from '../../../interfaces/chofer.interface';
import { ChoferesService } from '../../services/choferes.service';

@Component({
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {
  public chofer!: Chofer;
  public dataLoaded = false;
  private dataSubscription: Subscription = new Subscription();

  public headerTitle?: string;

  constructor(
    private authService: AuthService,
    private choferesService: ChoferesService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.dataSubscription.add(this.choferesService.getChoferData().subscribe((data) => {
      this.chofer = data!;
      this.dataLoaded = true;
    }));
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  public changeHeaderTitle(newTitle: string): void {
    this.headerTitle = newTitle;
    this.cdr.detectChanges();
  }

  public sidebarItems = [
    {name: 'Home', icon:'home',   url: '/choferes/home'},
    // {name: 'Historial', icon:'schedule',   url: '/alumnos/history'},
    // {name: 'Ayuda',     icon:'headphones', url: '/alumnos/help'},
    {name: 'Mensajes',  icon:'chat',       url: '/choferes/messages'},
    // {name: 'Contactos', icon:'contact_emergency',    url: '/alumnos/contacts'},
    // {name: 'Notificaciones', icon:'notifications',   url: '/alumnos/notifications'},
    // {name: 'Configuracion',  icon:'settings',   url: '/alumnos/config'},

  ];

  onLogout(){
    this.authService.logout().then(() => {
      this.router.navigate(['/auth/login'])
      this.openSnackBar('Sesión cerrada', 2500);
    })
    .catch((error) => console.log(error))
  }

  public map_image = 'https://i.imgur.com/TN3iixl.png';


  openSnackBar(message: string, duration: number) {
    this.snackBar.open(message, undefined, {
      duration,
    });
  }
}
