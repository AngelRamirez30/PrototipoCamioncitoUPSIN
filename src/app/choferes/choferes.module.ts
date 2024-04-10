import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChoferesRoutingModule } from './choferes-routing.module';
import { MaterialModule } from '../material/material.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';
import { ChoferMessageSendedComponent } from './pages/messages-page/components/chofer-message/chofer-message.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LayoutPageComponent,
    HomePageComponent,
    MessagesPageComponent,
    ChoferMessageSendedComponent
  ],
  imports: [
    CommonModule,
    ChoferesRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class ChoferesModule { }
