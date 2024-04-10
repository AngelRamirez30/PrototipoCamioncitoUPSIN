import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {path: 'home', component: HomePageComponent},
      {path: 'messages', component: MessagesPageComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChoferesRoutingModule { }
