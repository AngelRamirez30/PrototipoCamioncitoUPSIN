import { Component } from '@angular/core';
import { LayoutPageComponent } from '../layout-page/layout-page.component';

@Component({
  templateUrl: './home-page.component.html',
  styles: ``
})
export class HomePageComponent {
  public map_image = 'https://i.imgur.com/TN3iixl.png';

  constructor(
    private layoutPage: LayoutPageComponent
  ){}

  ngOnInit(): void {
    this.layoutPage.changeHeaderTitle('Inicio');
  }
}
