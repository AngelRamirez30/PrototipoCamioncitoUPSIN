import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { LayoutPageComponent } from '../layout-page/layout-page.component';

@Component({
  templateUrl: './history-page.component.html',
  styles: ``
})
export class HistoryPageComponent {

  constructor(
    private layoutPage: LayoutPageComponent
  ){}

  ngOnInit(): void {
    this.layoutPage.changeHeaderTitle('Historial');
  }

  travelPeriods = [
    {
      label: 'Últimos 7 días',
      items: [
        { address: 'Av. Gabriel Leyva 3324, Loma Atravesada', time: '6:45 a.m.' },
        { address: 'Av. Gabriel Leyva 3324, Loma Atravesada', time: '6:20 a.m.' },
        { address: 'Centro Gral. Ángeles Flores, Centro, 82000', time: '6:40 a.m.' },
        { address: 'Centro Gral. Ángeles Flores, Centro, 82000', time: '6:40 a.m.' }
      ]
    },
    {
      label: 'Febrero',
      items: [
        { address: 'Av. Gabriel Leyva 3324, Loma Atravesada', time: '6:45 a.m.' },
        { address: 'Av. Gabriel Leyva 3324, Loma Atravesada', time: '6:20 a.m.' },
        { address: 'Centro Gral. Ángeles Flores, Centro, 82000', time: '6:40 a.m.' },
        { address: 'Centro Gral. Ángeles Flores, Centro, 82000', time: '6:40 a.m.' }
      ]
    }
  ];
}
