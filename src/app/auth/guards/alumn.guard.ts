import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { inject } from '@angular/core';

import { Observable, tap, map, switchMap, of } from 'rxjs';
import { AuthService } from '../services/auth.service';



const checkAuthStatus = (): Observable<boolean> => {
  //se inyectan el AuthService y el Router
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.stateUser().pipe(
    switchMap(user => {
      if (!user) {
        // No hay usuario autenticado, redirigir a la página de inicio de sesión
        router.navigate(['/auth/login']);
        return of(false);
      } else {
        // Obtener el rol del usuario autenticado
        return authService.getRoleUser(user.uid).
          pipe(
            map(user => {
              if (user!.rol === 'alumno') {
                // El usuario tiene el rol de alumno, permitir acceso
                return true;
              } else {
                // El usuario no tiene el rol de alumno, redirigir a la página de choferes
                router.navigate(['/choferes']);
                return false;
              }
            })
          )
      }
    }),

  );
};

//No hay necesidad de crear una clase, simplemente definiendo una función flecha
//y exportándola podemos utilizar sus funcionalidades de guard en el app-routing

// export const canActivatePublicGuard: CanActivateFn = ( //Hay que tener en cuenta el tipado CanActiveFn
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ) => {
//   // return checkAuthStatus();
// };

// export const canMatchPublicGuard: CanMatchFn = ( //Tipado CanMatchFN
//   route: Route,
//   segments: UrlSegment[]
// ) => {
//   // return checkAuthStatus();
// };
