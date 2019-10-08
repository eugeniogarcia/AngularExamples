import { Component } from '@angular/core';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  //Notese que aunque el servicio es privado, se puede acceder a el desde el template, señal de que el template es parte de la clase del componente
  constructor(private servicio: AlertService) { }
}
