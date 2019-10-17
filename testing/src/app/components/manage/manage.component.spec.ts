/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ManageComponent } from './manage.component';
import { StocksService } from '../../services/stocks.service';
import { StubStocksService } from '../../services/stocks.service.stub';
import { MockSymbolsList } from '../../services/stocks.mock';

describe('ManageComponent', () => {
  //guardaremos aqui el componente que queremos probar
  let component: ManageComponent;
  //Fixture nos permite testear componentes
  let fixture: ComponentFixture<ManageComponent>;
  let el: HTMLElement;

  beforeEach(() => {
    //Configura el modulo de test con todas las cosas que vamos a necesitar en nuestro test. En este caso el FormsModule
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [
        ManageComponent
      ],
      //Interesante tecnica. Para usar el servicio Mockeado en lugar del real, especificamos que en este test el provider StocksService sea implementado por el Mock
      providers: [
        { provide: StocksService, useClass: StubStocksService }
      ]
    });
  });

  beforeEach(() => {
    //Para testear componentes usamos una Fixture. Crea la Fixture para el componente que tenemos que probar
    fixture = TestBed.createComponent(ManageComponent);
    //Accede a la instancia del componente. Con la instancia podremos interactuar con el controler del componente
    component = fixture.componentInstance;
    //Accede a la vista del componente. Hay dos formas, una es acceder al DOM nativo, que es la que usamos aqui, la otra tecnica la podemos ver en el UT del componente Dashboard
    el = fixture.debugElement.nativeElement;
    //Dispara un ciclo de deteccion de cambios en el componente
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add or remove symbols from the list', () => {
    //Interactua con las propiedades y metodos del componente
    expect(component.symbols).toEqual(MockSymbolsList);
    component.stock = 'ABC';
    component.add();
    expect(component.symbols).toEqual([...MockSymbolsList, 'ABC']);
    component.remove('ABC');
    expect(component.symbols).toEqual(MockSymbolsList);
  });

  it('should render the template', () => {
    //Interactua con la vista del componente
    const items = el.querySelectorAll('td.mdl-data-table__cell--non-numeric');

    for (let i = 0; i < items.length; ++i) {
      expect(items[i].innerHTML).toContain(MockSymbolsList[i]);
    }
  });
});
