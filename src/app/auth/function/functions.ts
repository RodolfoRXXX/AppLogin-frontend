import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

//Función validadora de formato correo electrónico
    let emailReg = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");

    export function emailValidator():ValidatorFn{
      return (control: AbstractControl):ValidationErrors|null => {
        const incorrecto = emailReg.test(control.value);
        return !incorrecto ? {incorrectoName: {value: control.value}} : null;
      };
    }

//Función validadora de contraseña repetida
  export const validarPass: ValidatorFn = (control: AbstractControl): ValidationErrors | null => 
  {
    const password = control.get("password")
    const passwordRep = control.get("passwordRep")
  
    return password && passwordRep && password.value === passwordRep.value
      ? null 
      : { noIguales: true }
  };
