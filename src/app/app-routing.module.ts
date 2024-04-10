import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { canActivatePublicGuard, canMatchPublicGuard } from './auth/guards/public.guard';
// import { canActivateAuthGuard, canMatchAuthGuard } from './auth/guards/auth.guard';

import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { canActivateAuthGuard, canMatchAuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    // canActivate: [canActivatePublicGuard],
    // canMatch: [canMatchPublicGuard],
  },
  {
    path: 'alumnos',
    loadChildren: () => import('./alumnos/alumnos.module').then(m => m.AlumnosModule),
    // canActivate: [canActivateAuthGuard],
    // canMatch: [canMatchAuthGuard],
  },
  {
    path: 'choferes',
    loadChildren: () => import('./choferes/choferes.module').then(m => m.ChoferesModule),
    // canActivate: [canActivateAuthGuard],
    // canMatch: [canMatchAuthGuard],
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true} )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
