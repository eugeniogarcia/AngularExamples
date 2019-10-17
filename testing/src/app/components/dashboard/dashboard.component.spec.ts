/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Directive, Input, TemplateRef, ViewContainerRef, Component } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { CardTypeDirective } from '../../directives/card-type.directive';
import { CardHoverDirective } from '../../directives/card-hover.directive';
import { StocksService } from '../../services/stocks.service';
import { StubStocksService } from '../../services/stocks.service.stub';
import { MockSymbolsList } from '../../services/stocks.mock';

//En este caso nuestro componente, su vista, hace referencia a otros componentes y directivas que no nos intersan para nuestro test. Los mockeamos. Como no los necesitamos en mas tests los definimos inline
@Directive({
  selector: '[delay]'
})
class StubDelayDirective {
  @Input() set delay(ms: number) { this.viewContainer.createEmbeddedView(this.templateRef); }
  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) { }
}

@Component({
  selector: 'summary',
  template: '<div class="mdl-card">{{stock}}</div>'
})
class StubSummaryComponent {
  @Input() stock;
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let de: DebugElement;

  beforeEach(() => {
    //Creamos nuestro testing module con las cosas que vamos a necesitar para probar el dashboard component
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        //Stub del componente Summary
        StubSummaryComponent,
        //Stub de la directiva Delay
        StubDelayDirective,
        CardTypeDirective,
        CardHoverDirective,
      ],
      //Stub del servicio
      providers: [
        { provide: StocksService, useClass: StubStocksService }
      ]
    });
  });

  beforeEach(() => {
    //Crea el mock del componente...
    fixture = TestBed.createComponent(DashboardComponent);
    //...para acceder a su controler
    component = fixture.componentInstance;
    //...para acceder a su vista. En este caso no usamos el DOM nativo. Esta otra tecnica nos permite buscar elementos en la vista usando otros criterios "Angular"
    de = fixture.debugElement;
    expect(component.stocks).toBeFalsy();
    //Hasta que no lanzamos un change detection no se inicializan todas las propiedades
    fixture.detectChanges();
    expect(component.stocks).toBeTruthy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the template', () => {
    //Podemos buscar en la vista por criterios DOM, como css, pero tambien por elementos que tengan una determinada directiva
    expect(de.query(By.css('.mdl-cell')).properties.innerHTML).not.toContain('Loading');
    expect(de.queryAll(By.directive(StubSummaryComponent)).length).toEqual(MockSymbolsList.length);
  });
});
