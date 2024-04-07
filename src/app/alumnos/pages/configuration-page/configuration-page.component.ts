import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './configuration-page.component.html',
  styles: ``
})
export class ConfigurationPageComponent {
  constructor(

  ){}

  title = "CONFIGURACIÓN"; // Define the title variable
  user_pfp = "https://64.media.tumblr.com/0cf601b9cada3f81afddab5a185c6821/df94fd0d2752edcd-fe/s1280x1920/27d77b7c19942c03edc63273e4b3699dff132141.jpg"
}
