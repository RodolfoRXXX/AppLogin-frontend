import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ComunicationService } from 'src/app/services/comunication.service';
import { emailValidator, validarPass} from '../../function/functions';
import { md5 } from 'src/app/auth/function/md5';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  type_input_password:string;
  type_input_password_rep:string;
  ver_password:boolean
  ver_password_rep:boolean

  estadoSmt: string = 'registro';
  isLogin: boolean = false;
  displayLogin: boolean = false;
  messageLogin: string;
  classLogin: string;
  form: FormGroup;

  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router,
    private _com: ComunicationService
  ) { 
    this.type_input_password = 'password';
    this.type_input_password_rep = 'password';
    this.ver_password = false;
    this.ver_password_rep = false;
   }

  ngOnInit(): void {
    this.isUserLogin();
    this.crearFormulario();
  }

  crearFormulario(){
    this.form = new FormGroup({
      nombre: new FormControl('',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
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
      ]),
      passwordRep: new FormControl('',
      [
        Validators.required
      ]),
      codeEmail: new FormControl(''),
      active: new FormControl(0)
    }, { validators: validarPass })
  }

  actualizarSmt(){
    if(this.estadoSmt == 'error'){
      this.estadoSmt = 'registro';
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

  toggle_password_rep(type:string, state:boolean){
    this.type_input_password_rep = type;
    this.ver_password_rep = state;
  }

  onSubmit(){
    this.estadoSmt = 'load';
    let e = md5(this.form.get('email')?.value).slice(0,6);
    this.form.controls['codeEmail'].setValue(e);
    
    this._api.postTypeRequest('user/register', this.form.value).subscribe( (res:any) => {
      if ((res.status)&&(res.status != 0)){
        if(res.data != 'existente'){
          this.estadoSmt = 'ok';
          this.estadoLogin(true, 'alert-success', 'Usuario creado exitósamente!');
          this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
          this._auth.setDataInLocalStorage('token', res.token);
          this._auth.setDataInLocalStorage('userId', res.data[0].id);
          this._com.setDataId(res.data[0].id);
          setTimeout(() => {
            this._router.navigate(['verificate']);
          }, 2500);
          //AQUI DEBE ENVIAR EL CORREO ELECTRONICO CON EL "codeEmail" para verificar
        } else{
          this.estadoSmt = 'error';
          this.estadoLogin(true, 'alert-danger', 'Usuario existente');
          this._com.setDataId(null);
          setTimeout(() => {
            this._router.navigate(['login']);
          }, 2500);
        }
      } else{
        this.estadoSmt = 'error';
        this.estadoLogin(true, 'alert-warning', 'No se ha podido conectar con la base de datos. Intente nuevamente.');
        this._com.setDataId(null);
      }
    });
  }

  irLogin(){
    this._router.navigate(['login']);
  }

  isUserLogin(){
    if (this._auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }

}
