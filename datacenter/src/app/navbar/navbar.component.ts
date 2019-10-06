import {Component, Output, EventEmitter} from "@angular/core";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  styles: ['.btn { background-color: #999999; }']
})
export class NavbarComponent {

  constructor() { }
  //Define una propiedad de tipo EventEmitter llamado onRefresh. El evento no tiene payload
  @Output() onRefresh: EventEmitter<null>= new EventEmitter<null>();
  @Output() onRefresca: EventEmitter<null> = new EventEmitter<null>();

  //Metodo que dispara el evento
  refresh(){
    this.onRefresh.emit();
  }

  //Metodo que dispara el evento
  refresca() {
    this.onRefresca.emit();
  }
}
