import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';
import { emailValidator } from '../../function/functions';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  estadoSmt: string;
  displayLogin: boolean;
  messageLogin: string;
  classLogin: string;
  form: FormGroup;

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _api: ApiService,
    private _email:EmailService
  ) {
    this.estadoSmt = 'envio';
    this.displayLogin = false;
  }

  ngOnInit(): void {
    this.isUserLogin();
    this.creaFormulario();
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
            this._email.bifurcador('forgot', null, res.data[0].email, res.data[0].password, null);
            this.estadoSmt = 'ok';
            this.estadoLogin(true, 'alert-success', 'Los credenciales de acceso han sido enviadas a tu cuenta de correo electrónico.');
            setTimeout(() => {
              this._router.navigate(['login']);
            }, 5000);
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

}
