//Directiva de tipo atributo
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[cardType]'
})
export class CardTypeDirective implements OnInit {
  @Input() cardType;
  //Nos permite especificar las clases CSS a usar, aunque hay dos definidas por defectos
  @Input() increaseClass = 'increase';
  @Input() decreaseClass = 'decrease';

  //Servicio que nos permite interactuar con el elemento sobre el que se aplica la directiva
  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.cardType) {
      if (this.cardType >= 0) {
        //Recupera la lista de clases del elemento, y anade una clase
        this.el.nativeElement.classList.add(this.increaseClass);
        this.el.nativeElement.classList.remove(this.decreaseClass);
      } else if (this.cardType <= 0) {
        this.el.nativeElement.classList.add(this.decreaseClass);
        this.el.nativeElement.classList.remove(this.increaseClass);
      } else {
        this.el.nativeElement.classList.remove(this.increaseClass);
        this.el.nativeElement.classList.remove(this.decreaseClass);
      }
    }
  }
}
