import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { AlumnosService } from '../../services/alumnos.service';
import { Alumn } from '../../../interfaces/alumn.interface';
import { Subscription } from 'rxjs';
import { LayoutPageComponent } from '../layout-page/layout-page.component';

@Component({
  templateUrl: './configuration-page.component.html',
  styles: `
    span .mat-expansion-indicator:after{
      border-color: #1212 !important;
    }
  `,
})
export class ConfigurationPageComponent implements OnInit, OnDestroy {
  public alumn!: Alumn;
  public dataLoaded = false;
  private dataSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.dataSubscription.add(
      this.alumnosSvc.getAlumnoData().subscribe((data) => {
        this.alumn = data!;
        this.dataLoaded = true;
      })
    );
    this.layoutPage.changeHeaderTitle('Configuración');
  }
  constructor(
    private alumnosSvc: AlumnosService,
    private layoutPage: LayoutPageComponent
  ) {}

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  public conditionTerms = {
    introduction:
      'Al acceder y utilizar esta aplicación, aceptas cumplir con estos términos y condiciones en su totalidad.',
    terms: [
      {
        title: 'Uso de la Aplicación',
        subterms: [
          'La aplicación está destinada exclusivamente para el uso de estudiantes universitarios y personal autorizado de la institución',
          'Te comprometes a utilizar esta aplicación de manera responsable y a respetar los derechos de los demás usuarios',
        ],
      },
      {
        title: 'Registro y Cuenta de Usuario ',
        subterms: [
          'Para utilizar la aplicación, es necesario registrarse y crear una cuenta de usuario.',
          'Proporciona información precisa y actualizada durante el proceso de registro. ',
          'Eres responsable de mantener la confidencialidad de tu contraseña y de cualquier actividad que ocurra en tu cuenta.',
        ],
      },
      {
        title: 'Seguridad y Conducta',
        subterms: [
          'Te comprometes a respetar todas las normas de seguridad y conducta establecidas por la aplicación y la universidad.',
          'No toleramos ningún comportamiento inapropiado, discriminatorio o violento. Los usuarios que violen estas normas serán prohibidos de utilizar la aplicación.',
        ],
      },
      {
        title: 'Limitación de Responsabilidad',
        subterms: [
          'La aplicación de transporte privado no se hace responsable de cualquier daño, pérdida o lesión que pueda ocurrir durante el uso de los servicios proporcionados.',
          'Te recomendamos que utilices la aplicación con precaución y que sigas todas las instrucciones de seguridad proporcionadas.',
        ],
      },
      {
        title: 'Modificaciones',
        subterms: [
          'Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Los cambios entrarán en vigencia inmediatamente después de su publicación en la aplicación.',
        ],
      },
    ],
  };

  public abc: string[] = ['a', 'b', 'c', 'd'];

  public title = 'CONFIGURACIÓN'; // Define the title variable
  public user_pfp =
    'https://64.media.tumblr.com/0cf601b9cada3f81afddab5a185c6821/df94fd0d2752edcd-fe/s1280x1920/27d77b7c19942c03edc63273e4b3699dff132141.jpg';
}
