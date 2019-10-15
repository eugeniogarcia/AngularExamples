import { Directive } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { PhoneValidator } from './phone.validator';

@Directive({
    //Interesante. Para que la directiva se aplique el elemento tiene que tener las DOS propiedades
    selector: '[phone][ngModel]',
    //La directiva la añadimos a los otros validators que el elemento pudiera ya tener
    providers: [{ provide: NG_VALIDATORS, useExisting: PhoneDirective, multi: true }]
})
//Las directivas de validacion tienen que implementar el interface Validator
export class PhoneDirective implements Validator {
  //Referencia a nuestra funcion de validacion
  private validator = PhoneValidator();

  validate(control: AbstractControl): { [key: string]: any } {
      return this.validator(control);
  }
}
