import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { LayoutPageComponent } from '../layout-page/layout-page.component';
import { Message, Route } from '../../../interfaces/route.interface';
import { Subscription } from 'rxjs';
import { ChoferesService } from '../../services/choferes.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './messages-page.component.html',
  styles: ``
})
export class MessagesPageComponent {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(
    private choferesService: ChoferesService,
    private layoutPage: LayoutPageComponent,
    private snackBar: MatSnackBar,
    private renderer: Renderer2
  ){}

  public chofer_pfp = "https://hips.hearstapps.com/hmg-prod/images/walter-white-secuela-breaking-bad-1560364306.jpg";
  public background_image = "https://img.freepik.com/vector-premium/fondo-pantalla-naturaleza-minimalista-rango-montanas-azules-computadora_621211-140.jpg"


  public routeData!: Route;

  public selectedRouteName?: string;
  public dataLoaded = false;
  private routeDataSubscription: Subscription = new Subscription();

  messageText: string = '';

  ngOnInit(): void {
    this.routeDataSubscription.add(this.choferesService.getRouteData().subscribe(route => {
      this.routeData = route;
      this.layoutPage.changeHeaderTitle(`Mensajes de ${route.nombre}`);
      console.log(this.routeData);

      this.dataLoaded = true;
    }));
  }
  ngOnDestroy(): void {
      this.routeDataSubscription.unsubscribe();
  }

  sendMessage(): void {
    if (this.messageText.trim() === '') {
      // Validación para asegurarse de que el mensaje no esté vacío
      return;
    }

    this.choferesService.sendMessage(this.messageText)
      .then(() => {
        // Se ejecutará si el mensaje se envía correctamente
        console.log('Mensaje enviado exitosamente.');
        this.scrollToBottom();
        // Limpia el campo de entrada después de enviar el mensaje
        this.messageText = '';
      })
      .catch(error => {
        // Se ejecutará si hay algún error al enviar el mensaje
        console.error('Error al enviar el mensaje:', error);
        // Puedes mostrar un mensaje de error al usuario si lo deseas
      });
  }

  scrollToBottom(): void {
    const element = this.scrollContainer.nativeElement;
    element.scrollTop = element.scrollHeight;
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      // Llamar al método que deseas ejecutar al presionar Enter
      this.sendMessage();
    }
  }

  }
