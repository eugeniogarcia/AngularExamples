import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//Importamos este objeto para que Angular no lance un error cuando se encuentre
//un tag que no este asociado a un component - via un selector
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MetricComponent } from './metric/metric.component';
import { NodesComponent } from './nodes/nodes.component';
import { NodesRowComponent } from './nodes-row/nodes-row.component';
import { MetricBisComponent } from './metric-bis/metric-bis.component';
import { NodesDetailComponent } from './nodes-detail/nodes-detail.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    MetricComponent,
    NodesComponent,
    NodesRowComponent,
    MetricBisComponent,
    NodesDetailComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  //Con esta opcion lo que estamos diciendole a Angular es que si hay un tag en el esquema para el que no haya un component - selector - definido, que no arroje error. Esto lo hemos hecho para demostrar como pasar valores a un component unsando CSS selectors - ver metric y dashboard templates
  schemas: [NO_ERRORS_SCHEMA],
  //Especificamos que este componente hay que compilarlo. Hay que indicarlo porque como es un componente que se carga de forma dinamica, Angular no lo ve
  entryComponents: [NodesDetailComponent, AlertComponent]
})
export class AppModule { }
