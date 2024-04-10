import { Component } from '@angular/core';
import { LayoutPageComponent } from '../layout-page/layout-page.component';

@Component({
  templateUrl: './contacts-page.component.html',
  styles: ``
})
export class ContactsPageComponent {
  constructor(
    private layoutPage: LayoutPageComponent
  ){}

  ngOnInit(): void {
    this.layoutPage.changeHeaderTitle('Contactos');
  }
}
