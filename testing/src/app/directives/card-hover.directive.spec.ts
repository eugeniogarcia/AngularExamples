import { Component, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CardHoverDirective } from './card-hover.directive';

//Vamos a probar una directiva utilizando la tecnica de crearla directamente. Como el constructor de la directiva necesita una refencia a un elemento, crearemos un componente mock que hara las veces de ese elemento
@Component({
  //Hacemos referencia a la directiva
  template: `<div cardHover class="mdl-card decrease">Content</div>`
})
//El componente no hace nada
class MockComponent {}

describe('CardHoverDirective', () => {
  let directive: CardHoverDirective;
  let card: HTMLElement;

  beforeEach(() => {
    //Como siempre creamos nuestro testing module. El modulo hace referencia a nuestro mock componente
    TestBed.configureTestingModule({
      declarations: [
        MockComponent,
      ]
    });
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(MockComponent);
    //Buscamos la referencia a la vista de nuestro componente, y mas concretamente al elemento que tiene la directiva
    card = fixture.debugElement.query(By.css('[cardHover]')).nativeElement;
    //Creamos la directiva como habria hecho Angular, especificando sobre que elemento se tiene que crear, que no es otro que el de nuestro mock component
    directive = new CardHoverDirective(new ElementRef(fixture.debugElement.nativeElement));
    //Simulamos lo que haria Angular, ejecutando el hook del live cycle
    directive.ngOnInit();
  });

  it('should apply the correct background colors', () => {
    //Por un lado especificamos los valores del elemento en nuestro mock component...
    expect(card.style.backgroundColor.replace(/ /g, '')).toContain('rgb(255,171,64)');
    card.classList.remove('decrease');
    card.classList.add('increase');
    //...emulamos el livecycle de la directiva, como haria Angular...
    directive.ngOnInit();
    //...y comprobamos que la directiva haya hecho su trabajo
    expect(card.style.backgroundColor.replace(/ /g, '')).toContain('rgb(63,81,181)');
    // y lanzamos otra comprobacion
    card.classList.remove('increase');
    directive.ngOnInit();
    expect(card.style.backgroundColor).toEqual('');
  });

  it('should apply hover styling', () => {
    directive.onMouseOver();
    expect(card.style.top).toEqual('-2px');
    directive.onMouseOut();
    expect(card.style.top).toEqual('');
  });
});
