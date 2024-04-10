import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Route } from '../../../interfaces/route.interface';
import { AlumnosService } from '../../services/alumnos.service';
import { LayoutPageComponent } from '../layout-page/layout-page.component';

@Component({
  templateUrl: './messages-page.component.html',
  styles: ``
})
export class MessagesPageComponent implements OnInit, OnDestroy{

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;


  constructor(
    private alumnosService: AlumnosService,
    private layoutPage: LayoutPageComponent,
  ){}

  public routeData!: Route;
  public dataLoaded = false;
  private routeDataSubscription: Subscription = new Subscription();


  ngOnInit(): void {
    this.routeDataSubscription.add(this.alumnosService.getRouteData().subscribe((data) => {
      console.log(data);
      this.routeData = data!;
      this.dataLoaded = true;
      this.layoutPage.changeHeaderTitle(`Mensajes de ${this.routeData.nombre}`);
      this.scrollToBottom();
    }));
  }
  ngOnDestroy(): void {
      this.routeDataSubscription.unsubscribe();
  }

  scrollToBottom(): void {
    const element = this.scrollContainer.nativeElement;
    element.scrollTop = element.scrollHeight;
  }

  title = "MENSAJES DEL CHOFER"; // Define the title variable
  public chofer_pfp = "https://hips.hearstapps.com/hmg-prod/images/walter-white-secuela-breaking-bad-1560364306.jpg";
  background_image = "https://i.imgur.com/jf3jTVA.jpeg"

}
