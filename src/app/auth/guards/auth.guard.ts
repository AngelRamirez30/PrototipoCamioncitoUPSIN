import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { inject } from '@angular/core';

import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';



const checkAuthStatus = (): Observable<boolean> => {
  //se inyectan el AuthService y el Router
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.stateUser().pipe(
    map(user => {
      if (user) {
        // El usuario está autenticado, redirigir a otra ruta
        authService.getRoleUser(user.uid).subscribe((role) => {
          if (role?.rol === 'alumno') {
            router.navigate(['/alumnos']);
          } else {
            router.navigate(['/choferes']);
          }
        });
        return false;
      } else {
        return true;
      }
    })
  );
}

export const canActivateAuthGuard: CanActivateFn = ( //Hay que tener en cuenta el tipado CanActiveFn
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return checkAuthStatus();
};

export const canMatchAuthGuard: CanMatchFn = ( //Tipado CanMatchFN
  route: Route,
  segments: UrlSegment[]
) => {
  return checkAuthStatus();
};
