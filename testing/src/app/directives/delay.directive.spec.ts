import { Component } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, async, tick } from '@angular/core/testing';
import { DelayDirective } from './delay.directive';

@Component({
  template: `<div *delay="delay"><h1>DELAYED</h1></div>`
})
class MockComponent {
  delay = 10;
}

describe('DelayDirective', () => {
  let fixture: ComponentFixture<MockComponent>;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockComponent,
        //En este caso no creamos la directiva "manualmente" como haciamos con el test de card-hover directive
        DelayDirective
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockComponent);
    el = fixture.debugElement.nativeElement;
  });

  //Probamos usando fakeAsync. Nuestro test se ejecuta de forma sincrona. Dentro de este handler la funcion tick esta disponible
  it('should show after the specified delay using fakeAsync', fakeAsync(() => {
    //Comprueba el contenido en la vista
    expect(el.innerHTML).not.toContain('DELAYED');
    //Dispara el control de cambios
    fixture.detectChanges();
    //Espera 10 ms
    tick(10);
    //Verifica la vista
    expect(el.innerHTML).toContain('DELAYED');
  }));

  //En este caso vamos a hacer el test de forma asincrona
  it('should show after the specified delay using async', async(() => {
    expect(el.innerHTML).not.toContain('DELAYED');
    fixture.detectChanges();
    //Esta es la logica asincrona. Esperamos a que nuestro control haya terminado de procesar los cambios
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(el.innerHTML).toContain('DELAYED');
    });
  }));
});
