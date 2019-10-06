import { Component, Input } from '@angular/core';
//Hace referencia al servicio que gestiona un formulario modal activo
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-nodes-detail',
  templateUrl: './nodes-detail.component.html',
  styleUrls: ['./nodes-detail.component.css']
})
export class NodesDetailComponent {
  //No especifica el tipo de la propiedad node
  @Input() node;

  constructor(public servicioModal:NgbActiveModal) { }

  //Como argumento pasamos una propiedad. Asume que esa propiedad tendra dos propiedades, used y available
  isDanger(prop) {
    return this.node[prop].used / this.node[prop].available > 0.7;
  }

  getType(prop) {
    return (this.isDanger(prop)) ? 'danger' : 'success';
  }
}
