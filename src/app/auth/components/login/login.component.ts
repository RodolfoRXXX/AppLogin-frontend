import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ComunicationService } from 'src/app/services/comunication.service';
import { emailValidator } from '../../function/functions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  type_input_password:string;
  ver_password:boolean

  displayLogin: boolean;
  messageLogin: string;
  classLogin: string;
  form: FormGroup;
  estadoSmt: string;

  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router,
    private _com: ComunicationService
  ) {
    this.type_input_password = 'password';
    this.ver_password = false;
    this.displayLogin = false;
    this.estadoSmt = 'ingreso';
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
      ]),
      password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ])
    })
  }

  actualizarSmt(){
    if(this.estadoSmt == 'error'){
      this.estadoSmt = 'ingreso';
      this.estadoLogin(false, '', '');
    }
  }

  estadoLogin( display:boolean, clase:string, message:string ){
    this.displayLogin = display;
    this.classLogin = clase;
    this.messageLogin = message;
  }

  toggle_password(type:string, state:boolean){
    this.type_input_password = type;
    this.ver_password = state;
  }

  onSubmit(){
    this.estadoSmt = 'load';
    this._api.postTypeRequest('user/login', this.form.value).subscribe({
      next: (res: any) => {
        if(res.status == 1){
          if(res.data.length > 0){
            this.estadoSmt = 'ok';
            this.estadoLogin(true, 'alert-success', 'Acceso autorizado!');
            this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
            this._auth.setDataInLocalStorage('token', res.token);
            this._auth.setDataInLocalStorage('userId', res.data[0].id);
            this._com.setDataId(res.data[0].id);
            this._router.navigate(['profile']);
          } else{
            this.estadoSmt = 'error';
            this.estadoLogin(true, 'alert-danger', 'Usuario o contraseña incorrectos.');
            this._com.setDataId(null);
          }
        } else{
          //devuelve error
          this.estadoSmt = 'error';
          this.estadoLogin(true, 'alert-warning', 'Hubo un problema al validar las credenciales. Intentá nuevamente.');
          this._com.setDataId(null);
        }
      },
      error: (error) => {
        //ventana de error
        this.estadoSmt = 'error';
        this.estadoLogin(true, 'alert-warning', 'No se ha podido conectar con la base de datos. Intentá nuevamente.');
        this._com.setDataId(null);
      }
    })
  }

  irRegistro(){
    this._router.navigate(['register']);
  }

  irForgot(){
    this._router.navigate(['forgot']);
  }

  isUserLogin(){
    if (this._auth.getUserDetails() != null) {
      this._router.navigate(['profile']);
    }
  }

  logout(){
    this._auth.clearStorage();
    this._router.navigate(['']);
  }

}
