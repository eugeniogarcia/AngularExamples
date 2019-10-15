import { AbstractControl, ValidatorFn } from '@angular/forms';

const expression = /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/;

//Exporta una funcion que devuelve una funcion de validacion. EL tipo de las funciones de validacion es ValidatorFn. Podemos ver otra en hours.validator
//La funcion de validacion debe retornar un objeto en caso de que la validacion no se pase. En el objeto se indica el nombre de la propiedad a validar, en este caso la hemos llamado telefono. Mirar customer form para ver como la usamos para validar el formulario
//Esta validacion es similar a la minlength que viene con html5
export function PhoneValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    //Verificamos que el telefono siga la reg exp, y tenga un tamaño menor de 14
    const valid = expression.test(control.value) && control.value.length < 14;
    return valid ? null : { telefono: true };
  };
}
