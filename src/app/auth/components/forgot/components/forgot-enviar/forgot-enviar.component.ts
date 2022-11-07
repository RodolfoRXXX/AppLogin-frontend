import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { emailValidator } from 'src/app/auth/function/functions';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-forgot-enviar',
  templateUrl: './forgot-enviar.component.html',
  styleUrls: ['./forgot-enviar.component.css']
})
export class ForgotEnviarComponent implements OnInit {

  @Output() verificado_email: EventEmitter<any>;
  @Output() estado: EventEmitter<any>;

  estadoSmt: string;
  displayLogin: boolean;
  messageLogin: string;
  classLogin: string;
  form: FormGroup;
  correo_verificado: boolean;

  user_email:string;
  user_code: string;

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _api: ApiService,
    private _email:EmailService
  ) {
    this.estadoSmt = 'envio';
    this.displayLogin = false;
    this.estado = new EventEmitter();
    this.verificado_email = new EventEmitter();
    this.correo_verificado = false;
  }

  creaFormulario(){
    this.form = new FormGroup({
      email: new FormControl('',
      [
        Validators.required,
        emailValidator()
      ])
    })
  }

  ngOnInit(): void {
    this.isUserLogin();
    this.creaFormulario();
  }

  actualizarSmt(){
    if(this.estadoSmt == 'error'){
      this.estadoSmt = 'envio';
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
    this._api.postTypeRequest('user/forgot', this.form.value).subscribe({
      next: (res: any) => {
        if(res.status == 1){
          if(res.data == 'noencontrado'){
            this.estadoSmt = 'error';
            this.estadoLogin(true, 'alert-danger', 'Correo electrónico no encontrado.');
          } else{
            this.form.get('email')?.disable();
            this.estadoSmt = 'ok';
            this.user_email = res.data[0].email;
            this.user_code = res.data[0].codeEmail;
            this.correo_verificado = true;
          }
        } else{
          //devuelve error
          this.estadoSmt = 'error';
          this.estadoLogin(true, 'alert-warning', 'Hubo un problema al consultar el correo electrónico. Intentá nuevamente.');
        }
      },
      error: (error) => {
        //ventana de error
        this.estadoSmt = 'error';
        this.estadoLogin(true, 'alert-warning', 'No se ha podido conectar con la base de datos. Intentá nuevamente.');
      }
    });
  }

  isUserLogin(){
    if (this._auth.getUserDetails() != null) {
      this._router.navigate(['profile']);
    }
  }

  irLogin(){
    this._router.navigate(['login']);
  }

  actualizar_estado(e:any){
      this.estado.emit(e);
  }

  enviar_codigo(){
    this._email.bifurcador('verificate', null, this.user_email, null, this.user_code);
    this.estadoLogin(true, 'alert-success', 'El código ha sido enviado a tu cuenta de correo electrónico.');
            setTimeout(() => {
              this.verificado_email.emit(this.user_email);
              this.estado.emit('enviado');
            }, 4000);
  }

  ingresar_codigo(){
    this.verificado_email.emit(this.user_email);
    this.estado.emit('enviado');
  }

}
