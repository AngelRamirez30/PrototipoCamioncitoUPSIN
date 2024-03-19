import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HistoryPageComponent } from './pages/history-page/history-page.component';
import { HelpPageComponent } from './pages/help-page/help-page.component';
import { ContactsPageComponent } from './pages/contacts-page/contacts-page.component';
import { NotificationsPageComponent } from './pages/notifications-page/notifications-page.component';
import { ReportsPageComponent } from './pages/reports-page/reports-page.component';
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';
import { ConfigurationPageComponent } from './pages/configuration-page/configuration-page.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { AlumnosRoutingModule } from './alumnos-routing.module';



@NgModule({
  declarations: [
    HomePageComponent,
    LayoutPageComponent,
    HistoryPageComponent,
    HelpPageComponent,
    ContactsPageComponent,
    NotificationsPageComponent,
    ReportsPageComponent,
    MessagesPageComponent,
    ConfigurationPageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    AlumnosRoutingModule
  ]
})
export class AlumnosModule { }
