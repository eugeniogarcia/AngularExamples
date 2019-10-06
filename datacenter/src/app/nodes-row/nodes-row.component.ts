import { Component, Input } from '@angular/core';
//Servicio para gestionar formularios modales
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NodesDetailComponent } from '../nodes-detail/nodes-detail.component';

@Component({
  //El selector es una propiedad. En aquellos elementos en los que figure esta propiedad se
  //incluira este componente
  selector: '[app-nodes-row]',
  templateUrl: './nodes-row.component.html',
  styleUrls: ['./nodes-row.component.css']
})
export class NodesRowComponent {

  //Admite cualquier tipo. El tipo se pasara con property binding
  @Input() node: any;

  constructor(private servicioModal:NgbModal) { }

  isDanger(prop) {
    //Esperamos que el objeto pasado como node tenga un elemento que sea un tipo que contenga
    //dos propiedades, used y available
    return this.node[prop].used / this.node[prop].available > 0.7;
  }

  abrirDetalle(nodo){
    const detalle=this.servicioModal.open(NodesDetailComponent);
    detalle.componentInstance.node=nodo;
  }

}
