import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor(
    private authService: AuthService,
  ){}

  // public get user(): string{
  //   return this.authService.userCurrentEmail as string;
  // }
}
