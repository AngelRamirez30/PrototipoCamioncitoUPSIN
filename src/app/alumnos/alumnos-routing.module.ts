import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ReportsPageComponent } from './pages/reports-page/reports-page.component';
import { HistoryPageComponent } from './pages/history-page/history-page.component';
import { HelpPageComponent } from './pages/help-page/help-page.component';
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';
import { ContactsPageComponent } from './pages/contacts-page/contacts-page.component';
import { NotificationsPageComponent } from './pages/notifications-page/notifications-page.component';
import { ConfigurationPageComponent } from './pages/configuration-page/configuration-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {path: 'home',          component: HomePageComponent},
      {path: 'history',       component: HistoryPageComponent},
      {path: 'help',          component: HelpPageComponent},
      {path: 'messages',      component: MessagesPageComponent},
      {path: 'contacts',      component: ContactsPageComponent},
      {path: 'notifications', component: NotificationsPageComponent},
      {path: 'config',        component: ConfigurationPageComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'},
    ]
  },
  {
    path: 'reports',
    component: ReportsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }
