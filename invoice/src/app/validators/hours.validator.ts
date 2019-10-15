import { AbstractControl, ValidatorFn } from '@angular/forms';

//Validacion que comprueba que el valor este expresado en multiplos de 0,25, o sea, cuartos de hora
export function HoursValidator(control: AbstractControl): { [key: string]: any } {
  return (Number.isInteger(control.value * 4)) ? null : { hours: true };
}
