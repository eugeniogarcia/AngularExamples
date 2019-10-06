import { Component} from '@angular/core';

@Component({
  //El selector es una propiedad. En aquellos elementos en los que figure esta propiedad se 
  //incluira este componente
  selector: '[app-nodes]',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.css']
})
export class NodesComponent  {

  constructor() { }

}
