//Usamos el ViewChild para referenciar a uno de los children del App component
//ViewContainerRef es un children contenedor de components. Es una referencia
//ComponentFactoryResolver es un servicio que implementa el modelo de factory para crear componentes Angular de forma dinamica
import { Component,ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlertComponent } from './alert/alert.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  //En este caso identificamos el Children por medio de su tipo
  @ViewChild(DashboardComponent) dashboard: DashboardComponent;

  //Aqui estamos referenciado tambien a un Children, pero el children en este caso es el componente que hemos cargado de forma dinamica, y colocado en el cajadeAviso. El tipo es un ViewContainerRef, esto es, contenedor que podra alojar distintos tipos de componentes
  @ViewChild('cajadeAviso',{read: ViewContainerRef}) formularioAviso:ViewContainerRef;

  //Referencia a un componente de tipo Alert
  refAlerta:ComponentRef<AlertComponent>;

  //Injectamos el servicio factoria que nos permite crear de forma dinamica componentes
  constructor(private factoria:ComponentFactoryResolver){}

  refresca() {
    //Podemos comunicarnos con el Children
    this.dashboard.generateData();
  }

  alarma(lafecha:Date){
    //Si no hay una referencia, la crea
    if(!this.refAlerta){
      //Crea el componente
      const alerta=this.factoria.resolveComponentFactory(AlertComponent);
      //Guarda el componente en la referencia
      this.refAlerta=this.formularioAviso.createComponent(alerta);
    }
    //Especifica el valor de la propiedad fecha del componente...
    this.refAlerta.instance.fecha=lafecha;
    //...y dispara el ciclo de comprobacion de cambios. El cambio no se ha hecho desde Angular, asi que le tenemos que decir a Angular que propague los cambios - porque por si solo no se entera
    this.refAlerta.changeDetectorRef.detectChanges();

    //A los cinco segundos quita la alerta
    setTimeout(() => this.destroyAlert(), 5000);
  }

  destroyAlert(): void {
    if (this.refAlerta) {
      //Destruye el componente
      this.refAlerta.destroy();
      //destruye la referencia
      delete this.refAlerta;
    }
  }

}
