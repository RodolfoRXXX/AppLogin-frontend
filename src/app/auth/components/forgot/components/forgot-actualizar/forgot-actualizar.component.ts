import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { validarPass } from 'src/app/auth/function/functions';
import { ApiService } from 'src/app/services/api.service';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-forgot-actualizar',
  templateUrl: './forgot-actualizar.component.html',
  styleUrls: ['./forgot-actualizar.component.css']
})
export class ForgotActualizarComponent implements OnInit {

  @Output() estado: EventEmitter<any>;
  @Input() user_email:string;
  form: FormGroup;
  estadoSmt: string;
  displayLogin: boolean;
  classLogin: string;
  messageLogin: string;

  constructor(
    private _api: ApiService,
    private _email: EmailService
  ) {
    this.estadoSmt = 'actualizar';
    this.displayLogin = false;
    this.estado = new EventEmitter();
  }

  crearFormulario( email:string ){
    this.form = new FormGroup({
      password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]
    ),
      passwordRep: new FormControl('',
      [
        Validators.required
      ]
    ),
      email: new FormControl((email)?email:'')
    }, { validators: validarPass })
  }

  ngOnInit(): void {
    this.crearFormulario(this.user_email);
  }

  actualizarSmt(){
    if(this.estadoSmt == 'error'){
      this.estadoSmt = 'actualizar';
      this.estadoLogin(false, '', '');
    }
  }

  estadoLogin( display:boolean, clase:string, message:string ){
    this.displayLogin = display;
    this.classLogin = clase;
    this.messageLogin = message;
  }

  onSubmit(){
    this.estadoSmt = 'load';
      this._api.putTypeRequest('user/restore-password', this.form.value).subscribe( (res:any) => {
        if((res.status == 1)&&(res.data.affectedRows != 0)){
          this._email.bifurcador('change_pass', null, this.form.get('email')?.value, null, null);
          this.estadoSmt = 'ok';
          this.estadoLogin(true, 'alert-success', 'Contraseña modificada!');
          setTimeout(() => {
            this.estado.emit('actualizado');
          }, 2000);
        } else{
          this.estadoSmt = 'error';
          this.estadoLogin(true, 'alert-warning', 'No se ha podido modificar la contraseña. Intentá nuevamente.');
        }
      });
  }

}
